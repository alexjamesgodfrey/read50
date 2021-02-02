import React, { useEffect } from 'react';
import LeaderboardEntry from './LeaderboardEntry.js';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/Leaderboard.scss';

const LeaderboardPage = (props) => {

    
    return (
        <div className="leaderboard">
        {
            props.entries.map((entry, i) => {
            //error handling for an undefined image
            return <LeaderboardEntry
                        key={i}
                        rank={entry.rank}
                        username={entry.username}
                        penname={entry.penname}
                        threeNumSum={entry.threeNumSum}
                        delay={props.delay}
                    />
            })
            }
            
      </div>
    )
}

export default LeaderboardPage;