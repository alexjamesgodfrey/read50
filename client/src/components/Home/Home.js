import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import CountUp from 'react-countup';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading.js';
import './Home.scss';
 
const Home = () => {
    //user checks
    const { currentUser } = useAuth();

    //state for counts and loading
    const [users, setUsers] = useState(0);
    const [books, setBooks] = useState(0);
    const [pages, setPages] = useState(0);
    const [words, setWords] = useState(0);
    const [loading, setLoading] = useState(true);

    //fetches values from leaderboards database that is automatically updated with list add with a trigger function
    const getNumbers = async () => {
        const counts = await fetch('/api/leaderboards');
        const countsText = await counts.json();
        
        setBooks(parseInt(countsText.books));
        setPages(parseInt(countsText.pages));
        setWords(countsText.words);
        setUsers(countsText.users);
        setLoading(false);
    }
    
    //runs on startup
    useEffect(() => {
        getNumbers();
    }, [])

    //returns a spinner if loading
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
                {currentUser ?
                    <Link to="/search"><Button id="loginbutton" variant="danger" size="lg">welcome, {currentUser.displayName}</Button></Link>
                :
                    <Link to="/search"><Button id="loginbutton" variant="danger" size="lg">get started</Button></Link>
                }
            </div>
        </div>
    )
}
 
export default Home;