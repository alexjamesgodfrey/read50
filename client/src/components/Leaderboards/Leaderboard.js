import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../Header/Header.js';
import LeaderboardList from './LeaderboardList.js';
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

    return (
        <div>
            <Header />
            <div>
                <div className="heading">
                    <h3>top 100 read50 users</h3>
                    <h6>ordered by words read</h6>
                </div>
                <div>
                    {loading ?
                        <div className="spinner-container">
                        <Spinner animation="border" variant="danger" size="xl" />
                        </div>
                    :
                        <div>
                            <div className="leaderboard-entry">
                                <div className="entry-rank">rank</div>
                                <div className="entry-name">username</div>
                                <div className="entry-meat">books/pages/words</div>
                            </div>
                            <LeaderboardList users={users} getLeaderboards={getLeaderboards} />
                        </div>
                    }
                </div>
                </div>
        </div>  
    )
}

export default Leaderboard;