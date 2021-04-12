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
        setBooks(parseInt(countsText.books).toLocaleString());
        setPages(parseInt(countsText.pages));
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
                <p><CountUp suffix=" books." end={books} duration={3} separator="," /></p>
                <p><CountUp suffix=" pages." end={pages} duration={2} separator="," /></p>
                <p><CountUp suffix=" words." end={words} duration={2} separator="," /></p>
                <p><CountUp prefix="Read by "suffix=" users" end={users} duration={3} separator="," /></p>
                <div className="desc"><p className="smaller">Challenge friends, join clubs, and climb the leaderboards. Registration only takes 30 seconds.</p></div>
                <LoginButton text="Get Started" />
            </div>
        </div>
    )
}
 
export default Home;