import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../Header/Header.js';
import LeaderboardList from './LeaderboardList.js';
import Loading from '../Loading.js';
import './Leaderboard.scss';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLeaderboards = async () => {
        const users = await fetch('/api/users');
        const usersJson = await users.json();
        for (let i = 0; i < usersJson.length; i++) {
            let user = usersJson[i];
            user["rank"] = i+1;
        }
        setUsers(usersJson);
        setLoading(false);
    }

    useEffect(() => {
        getLeaderboards();
    }, [])

    if (loading) {
        return <Loading title={'loading the leaderboards'} desc={'this can take a few seconds; it\'ll be worth the wait'}/>
    }
    return (
        <div className="">
            <Header />
                <div>
                <h3 className="head">Read50 Leaderboard</h3>
                <div>
                <div className="leaderboard-entry">
                <div className="entry-rank">Rank</div>
                <div className="entry-name">Username</div>
                <div className="entry-meat">Books/Pages/Words</div>
                </div>
                <LeaderboardList users={users} getLeaderboards={getLeaderboards} />
                </div>
                </div>
            }
        </div>  
    )
}

export default Leaderboard;