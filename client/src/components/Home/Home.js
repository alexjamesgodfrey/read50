import React, { useState, useEffect, Component } from 'react';
import CountUp from 'react-countup';
import Loading from '../Loading.js';
import LoginButton from '../LoginButton.js';
import './Home.scss';
 
const Home = () => {
    const [users, setUsers] = useState(0);
    const [books, setBooks] = useState(0);
    const [pages, setPages] = useState(0);
    const [words, setWords] = useState(0);
    const [loading, setLoading] = useState(true);

    const getNumbers = async () => {
        const counts = await fetch('/api/leaderboards');
        const countsText = await counts.json();

        const users = await fetch('/api/usercount');
        const usersText = await users.json();
        
        setUsers(usersText);
        setBooks(countsText.books);
        setPages(countsText.pages);
        setWords(countsText.words);
        setLoading(false);
    }

    useEffect(() => {
        getNumbers();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="sample-total">
            <div className="counts">
                <p><CountUp end={books} duration={3} /> books.</p>
                <p><CountUp end={pages} duration={2} /> pages.</p>
                <p><CountUp end={words} duration={2} /> words.</p>
                <p>Read by <CountUp end={users} duration={3} /> users.</p>
                <div className="desc"><p className="smaller">Challenge friends, join clubs, and climb the leaderboards. Registration only takes 30 seconds.</p></div>
                <LoginButton text="Get Started" />
            </div>
        </div>
    )
}
 
export default Home;