import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import '../styles/Leaderboard.scss';


const LeaderboardEntry = (props) => {
    const [load, setLoad] = useState(true);

    // const loading = async (ms) => {
    //     await props.delay(ms);
    //     setLoad(false);
    // }

    // useEffect(() => {
    //     loading(1000);
    // }, [])

    // if (load) {
    //     return (
    //         <div className="shelf">
    //             <Spinner className="shelfentry" animation="border" variant="danger" size="sm" />
    //         </div>
    //     )
    // }

    return (
        <div className="leaderboard-entry">
            <div className="real-entry-rank">#{props.rank}</div>
            <div className="real-entry-name">{props.username}</div>
            <div className="real-entry-meat">{props.threeNumSum}</div>
        </div>
    )
}

export default LeaderboardEntry;