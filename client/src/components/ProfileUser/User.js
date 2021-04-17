import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies  } from 'react-cookie';
import Header from '../Header/Header.js';
import Shelf from './Shelf.js';
import Timeline from './Timeline.js';
import Loading from '../Loading.js';
import { Spinner, ProgressBar, Nav } from 'react-bootstrap';
import './Profile.scss';


const User = (props) => {
    //fetches auth0 user information
    const { user, isAuthenticated } = useAuth0();
    let { username } = useParams();
    const [sub, setSub] = useState("");
    const [picture, setPicture] = useState("");

    const fetchCreds = async () => {
        console.log('fetch creds');
        try {
            //fetch auth0_id from username param
            const getSub = await fetch(`/api/usernametosub/${username}`);
            const subText = await getSub.json();
            console.log(subText);
            setSub(subText);
        } catch (err) {
            console.log('failed')
            console.error(err.message);
            setReRun(reRun + 1);
        }
    }

    //function to get day of year 
    const dayOfYear = date => {
        setDay(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    }

    const [reRun, setReRun] = useState(0);
    //main loading state -- set to false after 1250ms
    const [load, setLoad] = useState(true);
    //user stat state
    const [books, setBooks] = useState('books');
    const [pages, setPages] = useState('pages');
    const [words, setWords] = useState('words');
    const [total, setTotal] = useState('--/--/--');
    //sets state of edit button for yearly goa;
    const [edit, setEdit] = useState('Edit');
    //state that is set after fetch of books read since start of 2021
    const [readYear, setReadYear] = useState(0);
    //state that is set after fetch of yearly goal
    const [goal, setGoal] = useState('...');
    //change this to rerender a component that has it as a prop
    const [reRender, setReRender] = useState(0);
    //day of year function for calculating pacing
    const [day, setDay] = useState(0);
    //sets shelf on dropdown
    const [shelf, setShelf] = useState('All');
    //state for shelves
    const [TBR, setTBR] = useState([]);
    const [CURR, setCURR] = useState([]);
    const [ARL, setARL] = useState([]);
    const [DNF, setDNF] = useState([]);

    const getLists = async () => {
        await props.sleep(1000);
        try {
            const TBRResponse = await fetch(`/api/booklists/TBR/${sub}`)
            const TBRjson = await TBRResponse.json();
            const CURRResponse = await fetch(`/api/booklists/CURR/${sub}`)
            const CURRjson = await CURRResponse.json();
            const ARLResponse = await fetch(`/api/booklists/ARL/${sub}`)
            const ARLjson = await ARLResponse.json();
            const DNFResponse = await fetch(`/api/booklists/DNF/${sub}`)
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

    const getInfo = async () => {
        const info = await fetch(`/api/users/${sub}`);
        const infoJson = await info.json();
        const person = infoJson[0];
        setBooks(person.books);
        setPages(person.pages);
        setWords(person.words);
        setTotal(person.total);
        setGoal(person.goal);
        setPicture(person.picture_link);
        setReadYear(person.read_year);
    }

    fetchCreds();
    
    useEffect(() => {
        getInfo();
        getLists();
        dayOfYear(new Date());
    }, [sub])

    return (
        isAuthenticated && (
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
                                <img className="profile-pic" src={picture}></img>
                            </div>
                        
                            <div className="profile-info">
                                <p className="user-desc"><span id="user">USER</span></p>
                                <p className="profile-piece"><span className="name">{username}</span></p>
                            </div>

                            <div className="profile-rest">
                                <ProgressBar id="goal-progress" variant="danger" now={Math.max((readYear / goal * 100), 7)} label={(readYear / goal * 100).toFixed(2) + '%'} />
                                <div className="progress-box">
                                    <h4>Yearly Goal: </h4>
                                    <h4 className="goal">{goal} books</h4>
                                </div>
                            
                                <div className="stats">
                                    <p className="profile-piece">{((goal - readYear) / ((365 - day) / 7)).toFixed(2)} books per week to meet goal</p>
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
                                    <h4 className="goal">{goal} books</h4>
                                </div>
                                
                                <div className="stats">
                                    <p className="profile-piece">{((goal - readYear) / ((365 - day) / 7)).toFixed(2)} books per week to meet goal</p>
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
                            <div className="profile-main">
                                <Shelf sample={true} profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Want Shelf'} username={username} />
                                <Shelf sample={true} profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Currently Reading Shelf'} username={username} />
                                <Shelf sample={true} profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Read Shelf'} username={username} />
                                <Shelf sample={true} profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Did Not Finish Shelf'} username={username} />
                            </div>
                            :
                            <div className="profile-main">
                                <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={shelf} username={username} />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    );
}


export default User;