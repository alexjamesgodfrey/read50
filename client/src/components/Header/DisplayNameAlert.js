import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import Alert from 'react-bootstrap/Alert';
import './Header.scss';

export default function DisplayNameAlert() {
    const { currentUser } = useAuth();
    const [hasGoal, setHasGoal] = useState(true);
    const [show, setShow] = useState(true);

    const getGoal = async () => {
        try {
            const info = await fetch(`/api/users/${currentUser.uid}`);
            const infoJson = await info.json();
            const person = infoJson[0];
            if (person.goal) {
                setHasGoal(true);
            } else {
                setHasGoal(false)
            }
        } catch (error) {
            setHasGoal(false)
        }
    }

    useEffect(() => {
        getGoal();
    })
    
    if (show && (!currentUser.displayName || !currentUser.photoURL || !hasGoal)) {
        return (
            <Alert id="betaalert" variant="light" dismissible onClose={() => setShow(false)}>
                TODO:
                {!currentUser.displayName ? <Link id="alert-link" to="/settings"> | set username | </Link> : <span></span>}
                {!currentUser.photoURL ? <Link id="alert-link" to="/settings"> | upload profile picture | </Link> : <span></span>}
                {!hasGoal ? <Link id="alert-link" to="/profile"> | set yearly goal | </Link> : <span></span>}
            </Alert>
        )
    } else {
        return null;
    }
    
}
