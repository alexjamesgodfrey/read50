import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header.js';
import Shelf from './Shelf.js';
import Timeline from './Timeline.js';
import Loading from './Loading.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../styles/Profile.scss';

const Profile = (props) => {
    //fetches auth0 user information
    const { user, isAuthenticated } = useAuth0();

    //function to get day of year 
    const dayOfYear = date => {
        setDay(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    }

    //
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
    const [shelf, setShelf] = useState('Read Shelf');
    //state for shelves
    const [TBR, setTBR] = useState([]);
    const [CURR, setCURR] = useState([]);
    const [ARL, setARL] = useState([]);
    const [DNF, setDNF] = useState([]);

    //function that gets the users yearly goal and books read in current year and updates state
    const getGoals = async () => {
        await props.sleep(1000);
        try {
            //fetches yearly goal
            const goal = await fetch(`/api/goal/${user.sub}`);
            const goalJson = await goal.json();
            if (goalJson === null) {
                setGoal('NO GOAL SET');
            } else {
                setGoal(goalJson);
            }
            //fetches books read in 2021
            const readDB = await fetch(`/api/twooneread/${user.sub}`);
            const readJson = await readDB.json();
            setRead(readJson);
        } catch (err) {
            setReRun(reRun + 1);
            console.error(err.message);
        }
    }

    //function that is run on the click of the edit yearly goal button
    const onEdit = async () => {
        //changes button text
        if (edit === 'Edit') {
            setEdit('Save');
        } else {
            setEdit('Edit');
            //sends new goal to database
            const setDB = await fetch(`/api/setgoal/${goal}/${user.sub}`, {
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
    const getStats = async () => {
        await props.sleep(1000);
        try {
            //fetch books, pages, and words information and converts to json
            const books = await fetch(`/api/3numsum/books/${user.sub}`);
            let booksJson = await books.json();
            let booksReal = numConverter(parseInt(booksJson));
            const pages = await fetch(`/api/3numsum/pages/${user.sub}`);
            let pagesJson = await pages.json();
            let pagesReal = numConverter(parseInt(pagesJson));
            const words = await fetch(`/api/3numsum/words/${user.sub}`);
            let wordsJson = await words.json();
            let wordsReal = numConverter(parseInt(wordsJson));
            //sets stats state appropriately
            const total = booksReal + ' / ' + pagesReal + ' / ' + wordsReal;
            setStats(total);
        } catch (err) {
            console.error(err.message);
        }
    }

    //function to be run upon each click of the shelves div - it will update timeline and progress bar if an entry is to be removed
    const onShelfClick = async () => {
        getGoals();
        getStats();
        await props.sleep(500);
        setReRender(reRender + 1);
    }

    const getLists = async () => {
        await props.sleep(1000);
        try {
            const TBRResponse = await fetch(`/api/booklists/TBR/${user.sub}`)
            const TBRjson = await TBRResponse.json();
            const CURRResponse = await fetch(`/api/booklists/CURR/${user.sub}`)
            const CURRjson = await CURRResponse.json();
            const ARLResponse = await fetch(`/api/booklists/ARL/${user.sub}`)
            const ARLjson = await ARLResponse.json();
            const DNFResponse = await fetch(`/api/booklists/DNF/${user.sub}`)
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
        getGoals();
        getStats();
        getLists();
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
                    <div className="progress-box">
                        <h3>Yearly Goal: </h3>
                        {(edit === 'Edit') ? <h3 className="goal">{goal} books</h3> : <Form.Group>
                            <Form.Control onChange={handleChange} placeholder={goal} id="goal-enter" />
                                                                                    </Form.Group> 
                        }
                        <Button id="edit-button" variant="light" onClick={onEdit}>{edit}</Button>
                    </div>
                    <h3>Pace: {((goal - read) / ((365-day) / 7)).toFixed(3)} books / week to meet goal</h3>
                    <ProgressBar id="goal-progress" variant="danger" now={read / goal * 100} label={(read / goal * 100) + '%'} />
                    <div className="profile-top">
                        <img className="profile-pic" src={user.picture}></img>
                        <div className="profile-info">
                            <p className="profile-piece">Welcome, {user['https://www.read50.com/username']}</p>
                            <p className="profile-piece" id="stats">{stats}</p>
                        </div>
                    </div>
                    <div className="shelf-dropdown">
                        <DropdownButton variant="danger" id="dropdown-item-button" title={shelf}>
                            <Dropdown.Item as="button" onClick={() => setShelf('Want Shelf')}>Want</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Currently Reading Shelf')}>Currently Reading</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Read Shelf')}>Read</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => setShelf('Did Not Finish Shelf')}>Did Not Finish</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div onClick={onShelfClick} className="profile-main">
                        <Shelf TBR={TBR} CURR={CURR} ARL={ARL} DNF={DNF} delay={props.sleep} type={shelf} />
                        <Timeline key={reRender}/>
                    </div>
                </div>
            </div>
        )
    );
}


export default Profile;