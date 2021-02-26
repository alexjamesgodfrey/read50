import React from 'react';
import { Link } from 'react-router-dom';
import './Leaderboard.scss';


const LeaderboardEntry = (props) => {

    let link = `/user/${props.username}`;

    return (
        <div className="leaderboard-entry">
            <div className="real-entry-rank">#{props.rank}</div>
            <div className="real-entry-name"><Link to={link}>{props.username}</Link></div>
            <div className="real-entry-meat">{props.threeNumSum}</div>
        </div>
    )
}

export default LeaderboardEntry;