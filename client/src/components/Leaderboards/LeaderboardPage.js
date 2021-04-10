import React from 'react';
import LeaderboardEntry from './LeaderboardEntry.js';
import './Leaderboard.scss';

const LeaderboardPage = (props) => {
    return (
        <div className="leaderboard">
        {
            props.users.map((user, i) => {
            //error handling for an undefined image
            return <LeaderboardEntry
                        key={i}
                        rank={user.rank}
                        username={user.username}
                        threeNumSum={user.total}
                        delay={props.delay}
                    />
            })
            }
        </div>
    )
}

export default LeaderboardPage;