import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies } from 'react-cookie';
import { Spinner, ProgressBar, Button, Form, OverlayTrigger, Modal, Popover, PopoverContent, Nav } from 'react-bootstrap';
import Header from '../Header/Header.js';
import Shelf from './Shelf.js';
import UserLine from './UserLine.js';
import Notification from '../../images/notification.svg';
import Reddot from '../../images/reddot.svg';
import './Profile.scss';
import './ShelfEntry.scss';

const Profile = (props) => {
    //fetches auth0 user information
    const { user } = useAuth0();

    //allows use of the auth0 cookie
    const [cookies, setCookie] = useCookies(['auth0', 'username', 'picture']);

    //function to get day of year 
    const dayOfYear = date => {
        setDay(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    }

    //main loading state -- set to false after info is loaded
    const [load, setLoad] = useState(true);
    //user stat state
    const [books, setBooks] = useState('books');
    const [pages, setPages] = useState('pages');
    const [words, setWords] = useState('words');
    const [total, setTotal] = useState('--/--/--');
    //sets state of edit button for yearly goal;
    const [edit, setEdit] = useState('Edit');
    //state that is set after fetch of books read since start of 2021
    const [readYear, setReadYear] = useState(0);
    //state that is set after fetch of yearly goal
    const [goal, setGoal] = useState('NO GOAL SET');
    //change this to rerender a component that has it as a prop
    const [reRender, setReRender] = useState(0);
    //day of year function for calculating pacing
    const [day, setDay] = useState(0);
    //sets shelf on dropdown
    const [shelf, setShelf] = useState('All');
    //state for friends
    const [frequests, setFrequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [showFriends, setShowFriends] = useState(false);
    //state for shelves
    const [TBR, setTBR] = useState([]);
    const [CURR, setCURR] = useState([]);
    const [ARL, setARL] = useState([]);
    const [DNF, setDNF] = useState([]);

    //function that is run on the click of the edit yearly goal button
    const onEdit = async () => {
        //changes button text
        if (edit === 'Edit') {
            setEdit('Save');
        } else {
            setEdit('Edit');
            console.log(parseInt(goal));
            if (isNaN(goal)) {
                console.log('mischief');
                setGoal(50);
                const setDB = await fetch(`/api/setgoal/50/${cookies.auth0}`, {
                    method: "PUT",
                });
            };
            if (!isNaN(goal)) {
                //sends new goal to database
                const setDB = await fetch(`/api/setgoal/${goal}/${cookies.auth0}`, {
                    method: "PUT",
                });
            }
        }
    }

    //is run on change of goal
    const handleChange = e => {
        setGoal(e.target.value);
    }

    const getInfo = async () => {
        const info = await fetch(`/api/users/${cookies.auth0}`);
        const infoJson = await info.json();
        const person = infoJson[0];
        setBooks(person.books);
        setPages(person.pages);
        setWords(person.words);
        setTotal(person.total);
        setGoal(person.goal);
        setReadYear(person.read_year);
    }

    const getRequests = async () => {
        const incoming = await fetch(`/api/friends/incoming/${cookies.auth0}`);
        const incomingJson = await incoming.json();
        await setFrequests([...incomingJson]);
    }

    const getLists = async () => {
        try {
            const TBRResponse = await fetch(`/api/booklists/TBR/${cookies.auth0}`)
            const TBRjson = await TBRResponse.json();
            const CURRResponse = await fetch(`/api/booklists/CURR/${cookies.auth0}`)
            const CURRjson = await CURRResponse.json();
            const ARLResponse = await fetch(`/api/booklists/ARL/${cookies.auth0}`)
            const ARLjson = await ARLResponse.json();
            const DNFResponse = await fetch(`/api/booklists/DNF/${cookies.auth0}`)
            const DNFjson = await DNFResponse.json();
            setTBR(TBRjson);
            setCURR(CURRjson);
            setARL(ARLjson);
            setDNF(DNFjson);
            setLoad(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    //function to be run upon each click of the shelves div - it will update timeline and progress bar if an entry is to be removed
    const onShelfClick = async () => {
        getInfo();
        await props.sleep(500);
        setReRender(reRender + 1);
    }

    const denyRequest = async (username, i) => {
        const deny = await fetch(`/api/friends/rejectrequest/${cookies.auth0}/${username}`, {
            method: "DELETE"
        });
        getRequests();
    }

    const acceptRequest = async (username) => {
        const accept = await fetch(`/api/friends/acceptrequest/${cookies.auth0}/${username}`, {
            method: "PUT"
        });
        getRequests();
        getFriends();
    }

    //gets a list of completed friend requests
    const getFriends = async () => {
        let empty = [];
        const to = await fetch(`/api/friends/tome/${cookies.auth0}`);
        const toJson = await to.json();
        const from = await fetch(`/api/friends/fromme/${cookies.auth0}`);
        const fromJson = await from.json();
        empty = empty.concat(toJson).concat(fromJson);
        for (let i = 0; i < empty.length; i++) {
            empty[i].username = empty[i].username_a;
        }
        await setFriends(empty);
        console.log(friends);
    }

    //on hide, this a regeneration of the frinds list is called for
    const friendsModalHide = () => {
        setShowFriends(false)
        getFriends();
    }

    useEffect(() => {
        getInfo();
        getLists();
        getRequests();
        getFriends();
        dayOfYear(new Date());
    }, []);

    return (
        <div className="profile-all">
            <Header />
            {load ? 
                <div className="total">
                    <div className="spinner-container">
                        <Spinner animation="border" variant="danger" size="xl" />
                    </div>
                </div> 
            :
                <div className="profile">
                    <div className="profile-top">
                        <div className="picture-section">
                            <img className="profile-pic" src={cookies.picture}></img>
                            <Button variant="light" size="sm">upload</Button>
                        </div>
                        
                        <div className="profile-info">
                            <div className="user-notif">
                                <p className="user-desc"><span id="user">USER</span></p>
                                <OverlayTrigger trigger="click" placement="right" overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Title>Notifications</Popover.Title>
                                        {frequests.map((friend, i) => {
                                            return (
                                                <PopoverContent className="request-line">
                                                        {friend.username_a}
                                                        <div className="contents">
                                                            <div className="denied"><Button className="denied" id="canceled" variant="outline-warning" size="sm">denied</Button></div>
                                                            <div className="removables">
                                                                    <Button id="request-text" variant="warning" size="sm" onClick={() => denyRequest(friend.username_a)}>deny</Button>
                                                                    <Button id="request-text" variant="danger" size="sm" onClick={() => acceptRequest(friend.username_a)}>accept</Button>
                                                            </div>
                                                        </div>
                                                </PopoverContent>
                                            )     
                                        })}
                                            {frequests.length === 0 ? <PopoverContent className="request-line">nothing yet :( <Link to="/search">find friends</Link></PopoverContent> : <span></span>}
                                        </Popover>
                                        }>
                                    <div className="notification-center">
                                        <img id="notification-bell" src={Notification}></img>
                                        {frequests.length !== 0 ? <img id="has-notification" src={Reddot}></img> : <span></span>}
                                    </div>
                                </OverlayTrigger>
                            </div>
                            <p className="profile-piece"><span className="name" id="user">{cookies.username}</span></p>
                        </div>

                        <div className="profile-rest">
                            <ProgressBar id="goal-progress" variant="danger" now={Math.max((readYear / goal * 100), 7)} label={(readYear / goal * 100).toFixed(2) + '%'} />
                            <div className="progress-box">
                                <h4 className="goal">Yearly Goal: </h4>
                                {(edit === 'Edit') ? <h4 className="goal">{goal} books</h4> : <Form.Group>
                                    <Form.Control onChange={handleChange} placeholder={goal} id="goal-enter" />
                                                                                            </Form.Group> 
                                }
                                <Button id="edit-button" variant="light" onClick={onEdit} size="sm">{edit}</Button>
                            </div>
                            
                            <div className="stats">
                                <div className="numsum">
                                    <p className="profile-piece" id="stats"><strong>{parseInt(books).toLocaleString()}</strong> books</p>
                                    <p className="profile-piece" id="stats"><strong>{parseInt(pages).toLocaleString()}</strong> pages</p>
                                    <p className="profile-piece" id="stats"><strong>{parseInt(words).toLocaleString()}</strong> words</p>
                                </div>
                                <div className="numsum">
                                    <p className="under" id="stats" onClick={() => setShowFriends(true)}>view friends</p>
                                    <Modal show={showFriends} onHide={() => friendsModalHide()}>
                                        <Modal.Header closeButton>
                                        <Modal.Title id="friends-title">your supporting characters</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        {
                                            friends.map((user, i) => {
                                                return (
                                                    <UserLine key={i} info={user} sty={{ 'font-size': '30px' }} profile={true} accepted={friends} />
                                            )
                                            })
                                        }
                                        {friends.length === 0 ? <p id="no-friends">you're flying solo. <Link id="no-friends" to="/search">find supporting characters</Link></p> : <span></span>}
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={() => friendsModalHide()}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <p className="under" id="stats">view clubs</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Nav className="profile-nav">
                        <Nav.Item activeClassName="profile-nav-selected" className="profile-nav-item" onClick={() => setShelf('All')}>OVERVIEW</Nav.Item>
                        <Nav.Item activeClassName="profile-nav-selected" className="profile-nav-item" onClick={() => setShelf('Want Shelf')}>WANT</Nav.Item>
                        <Nav.Item activeClassName="profile-nav-selected" className="profile-nav-item" onClick={() => setShelf('Currently Reading Shelf')}>CURRENT</Nav.Item>
                        <Nav.Item activeClassName="profile-nav-selected" className="profile-nav-item" onClick={() => setShelf('Read Shelf')}>READ</Nav.Item>
                        <Nav.Item activeClassName="profile-nav-selected" className="profile-nav-item" onClick={() => setShelf('Did Not Finish Shelf')}>DNF</Nav.Item>
                    </Nav>
                    {shelf === 'All' ?
                        <div className="profile-rest-small">
                            <div className="profile-header">
                                <p>About</p>
                            </div>
                            <ProgressBar id="goal-progress-small" variant="danger" now={Math.max((readYear / goal * 100), 10)} label={(readYear / goal * 100).toFixed(2) + '%'} />
                            <div className="progress-box">
                                <h4>Yearly Goal: </h4>
                                {(edit === 'Edit') ? <h4 className="goal">{goal} books</h4> : <Form.Group>
                                    <Form.Control onChange={handleChange} placeholder={goal} id="goal-enter" />
                                </Form.Group>
                                }
                                <Button id="edit-button" variant="light" onClick={onEdit} size="sm">{edit}</Button>
                            </div>
                                
                            <div className="stats">
                                <div className="numsum">
                                    <p className="profile-piece" id="stats"><strong>{parseInt(books).toLocaleString()}</strong> books</p>
                                    <p className="profile-piece" id="stats"><strong>{parseInt(pages).toLocaleString()}</strong> pages</p>
                                    <p className="profile-piece" id="stats"><strong>{parseInt(words).toLocaleString()}</strong> words</p>
                                </div>
                                <div className="numsum">
                                    <p className="under">view friends</p>
                                    <p className="under">view clubs</p>
                                </div>

                            </div>
                        </div>
                        :
                        <span></span>
                    }
                    {shelf === 'All' ? 
                        <div onClick={onShelfClick} className="profile-main">
                            <div className="shelves-container">
                                <Shelf sample={true} profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Read Shelf'} />
                                <Shelf sample={true} profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Currently Reading Shelf'} />
                                <Shelf sample={true} profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Want Shelf'} />
                                <Shelf sample={true} profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Did Not Finish Shelf'} />
                            </div>
                        </div>
                        :
                        <div onClick={onShelfClick} className="profile-main">
                            <Shelf profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={shelf} />
                        </div>
                    }
                </div>
            }
        </div>
    );
}


export default Profile;