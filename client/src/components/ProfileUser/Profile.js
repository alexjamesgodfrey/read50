import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies  } from 'react-cookie';
import Header from '../Header/Header.js';
import Shelf from './Shelf.js';
import Timeline from './Timeline.js';
import Loading from '../Loading.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PopoverContent from 'react-bootstrap/PopoverContent';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Notification from '../../images/notification.svg';
import './Profile.scss';
import './ShelfEntry.scss';

const Profile = (props) => {
    
    //fetches auth0 user information
    const { user, isAuthenticated } = useAuth0();

    //allows use of the auth0 cookie
    const [cookies, setCookie] = useCookies(['auth0']);

    //function to get day of year 
    const dayOfYear = date => {
        setDay(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    }

    //main loading state -- set to false after 1250ms
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
    //state for requests
    const [frequests, setFrequests] = useState([]);
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
        console.log(incomingJson)
        setFrequests([incomingJson])
        //setFrequests(frequests => [...frequests, incomingJson]);
        console.log(frequests);
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
            console.log(TBRjson)
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

    useEffect(() => {
        getInfo();
        getRequests();
        getLists();
        dayOfYear(new Date());
    }, []);

    //controls primary loading state
    if (load) {
        return (
            <Loading title={'loading your profile'} />
        )
    }

    return (
        isAuthenticated && (
            <div className="profile-all">
                <Header />
                <div className="profile">
                    {/* <div className="progress-box">
                        <h3>Yearly Goal: </h3>
                        {(edit === 'Edit') ? <h3 className="goal">{goal} books</h3> : <Form.Group>
                            <Form.Control onChange={handleChange} placeholder={goal} id="goal-enter" />
                                                                                    </Form.Group> 
                        }
                        <Button id="edit-button" variant="light" onClick={onEdit}>{edit}</Button>
                    </div>
                    <h6>({((goal - readYear) / ((365-day) / 7)).toFixed(3)} books per week needed to meet goal)</h6>
                    <ProgressBar id="goal-progress" variant="danger" now={Math.max((readYear / goal * 100), 10)} label={(readYear / goal * 100).toFixed(2) + '%'} /> */}
                    <div className="profile-top">
                        <div className="picture-section">
                            <img className="profile-pic" src={user.picture}></img>
                            <Button variant="light" size="sm">upload</Button>
                        </div>
                        
                        <div className="profile-info">
                            <div className="user-notif">
                                <p className="user-desc"><span id="user">USER</span></p>
                                <OverlayTrigger trigger="click" placement="right" overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Title>Notifications</Popover.Title>
                                        {frequests[0].map((friend, i) => {
                                            return <PopoverContent id="request-line">
                                                {friend.username_a}
                                                <div>
                                                    <Button id="request-text" variant="warning" size="sm">deny</Button>
                                                    <Button id="request-text" variant="danger" size="sm">accept</Button>
                                                </div>
                                            </PopoverContent>
                                        })}
                                  </Popover>
                                }>
                                    <img id="notification-bell" src={Notification}></img>
                                </OverlayTrigger>
                                
                            </div>
                            <p className="profile-piece"><span className="name">{user['https://www.read50.com/username']}</span></p>
                            {/* <p className="profile-piece" id="stats"><strong>{books}</strong> books</p>
                            <p className="profile-piece" id="stats"><strong>{pages}</strong> pages</p>
                            <p className="profile-piece" id="stats"><strong>{words}</strong> words</p>
                            <p className="profile-piece" id="stats"><span id="underlined">view friends</span></p>
                            <p className="profile-piece" id="stats"><span id="underlined">view clubs</span></p> */}
                        </div>

                        <div className="profile-rest">
                            <ProgressBar id="goal-progress" variant="danger" now={Math.max((readYear / goal * 100), 7)} label={(readYear / goal * 100).toFixed(2) + '%'} />
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
                                    <p className="under" id="stats">view friends</p>
                                    <p className="under" id="stats">view clubs</p>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="navigation">
                            <ul className="nav-list">
                            <li className="nav-item" onClick={() => setShelf('All')}>OVERVIEW</li>
                                <li className="nav-item" onClick={() => setShelf('Want Shelf')}>WANT</li>
                                <li className="nav-item" onClick={() => setShelf('Currently Reading Shelf')}>CURRENT</li>
                                <li className="nav-item" onClick={() => setShelf('Read Shelf')}>READ</li>
                                <li className="nav-item" onClick={() => setShelf('Did Not Finish Shelf')}>DIDN'T FINISH</li>
                            </ul>
                    </div>
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
                                    <p className="under" id="stats">view friends</p>
                                    <p className="under" id="stats">view clubs</p>
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
                            {/* <Timeline key={reRender} /> */}
                        </div>
                        :
                        <div onClick={onShelfClick} className="profile-main">
                            <Shelf profile={true} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={shelf} />
                            {/* <Timeline key={reRender} /> */}
                        </div>
                    }
                </div>
            </div>
        )
    );
}


export default Profile;