import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../Header/Header.js';
import Shelf from './Shelf.js';
import Timeline from './Timeline.js';
import Loading from '../Loading.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Profile.scss';
import { useParams } from 'react-router';

const Profile = (props) => {
    //fetches auth0 user information
    const { user, isAuthenticated } = useAuth0();
    let { username } = useParams();

    const [sub, setSub] = useState("");

    const fetchCreds = async () => {
        //fetch auth0_id from username param
        const getSub = await fetch(`/api/usernametosub/${username}`);
        const subText = await getSub.json();
        setSub(subText);
    }

    //function to get day of year 
    const dayOfYear = date => {
        setDay(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    }

    const [reRun, setReRun] = useState(0);
    //main loading state -- set to false after 1250ms
    const [load, setLoad] = useState(true);
    //user stat state
    const [stats, setStats] = useState('books / pages / words');
    //sets state of edit button for yearly goa;
    const [edit, setEdit] = useState('Edit');
    //state that is set after fetch of books read since start of 2021
    const [read, setRead] = useState(0);
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

    //function that gets the users yearly goal and books read in current year and updates state
    const getGoals = async (sub) => {
        await props.sleep(1000);
        try {
            //fetches yearly goal
            const goal = await fetch(`/api/goal/${sub}`);
            const goalJson = await goal.json();
            if (goalJson === null) {
                setGoal('NO GOAL SET');
            } else {
                setGoal(goalJson);
            }
            //fetches books read in 2021
            const readDB = await fetch(`/api/twooneread/${sub}`);
            const readJson = await readDB.json();
            setRead(readJson);
        } catch (err) {
            setReRun(reRun + 1);
            console.error(err.message);
        }
    }

    //function that is run on the click of the edit yearly goal button
    const onEdit = async (sub) => {
        //changes button text
        if (edit === 'Edit') {
            setEdit('Save');
        } else {
            setEdit('Edit');
            //sends new goal to database
            const setDB = await fetch(`/api/setgoal/${goal}/${sub}`, {
                method: "PUT",
            });
        }
    }

    //is run on change of goal
    const handleChange = e => {
        setGoal(e.target.value);
    }

    
    //helper function used in getStats to convert stats to user friendly form
    const numConverter = num => {
        //billion control
        if (num > 999999999) {
            num /= 1000000000;
            num = num.toFixed(2);
            num += 'bn';
        }
        //million control
        else if (num > 999999) {
            num /= 1000000;
            num = num.toFixed(2);
            num += 'm';
        }
        //thousand control
        else if (num > 999) {
            num /= 1000;
            num = num.toFixed(2);
            num += 'k';
        }
        return num;
    }

    //gets the users stats (books read, pages read, words read) and converts to readable form
    const getStats = async (sub) => {
        await props.sleep(1000);
        try {
            //fetch books, pages, and words information and converts to json
            const books = await fetch(`/api/3numsum/books/${sub}`);
            let booksJson = await books.json();
            let booksReal = numConverter(parseInt(booksJson));
            const pages = await fetch(`/api/3numsum/pages/${sub}`);
            let pagesJson = await pages.json();
            let pagesReal = numConverter(parseInt(pagesJson));
            const words = await fetch(`/api/3numsum/words/${sub}`);
            let wordsJson = await words.json();
            let wordsReal = numConverter(parseInt(wordsJson));
            //sets stats state appropriately
            const total = booksReal + ' / ' + pagesReal + ' / ' + wordsReal;
            setStats(total);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getLists = async (sub) => {
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

    
    
    useEffect(() => {
        fetchCreds();
        getGoals(sub);
        getStats(sub);
        getLists(sub);
        dayOfYear(new Date());
    }, [reRun])
    

    //controls primary loading state
    if (load) {
        return (
            <Loading />
        )
    }

    return (
        isAuthenticated && (
            <div className="profile-all">
                <Header />
                <div className="profile">
                    <h2>{username}'s read50 | {stats}</h2>
                    <div className="divider"></div>
                    <div>
                        <h3>Yearly Goal: {goal} books</h3>
                        <h3>Pace: {((goal - read) / ((365-day) / 7)).toFixed(3)} books / week to meet goal</h3>
                        <ProgressBar id="goal-progress-user" variant="danger" now={read / goal * 100} label={(read / goal * 100) + '%'} />
                    </div>
                    <div className="shelf-dropdown">
                        <DropdownButton variant="danger" id="dropdown-item-button" title={shelf}>
                            <Dropdown.Item as="button" onClick={() => setShelf('Want Shelf')}>Want</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Currently Reading Shelf')}>Currently Reading</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Read Shelf')}>Read</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Did Not Finish Shelf')}>Did Not Finish</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('All')}>View All</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    {shelf === 'All' ? 
                        <div className="profile-main">
                            <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Want Shelf'} />
                            <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Currently Reading Shelf'} />
                            <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Read Shelf'} />
                            <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={'Did Not Finish Shelf'} />
                            <Timeline key={reRender}/>
                        </div>
                        :
                        <div className="profile-main">
                            <Shelf profile={false} TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={shelf} />
                            <Timeline key={reRender}/>
                        </div>
                    }
                </div>
            </div>
        )
    );
}


export default Profile;