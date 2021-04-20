import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import Alert from 'react-bootstrap/Alert';
import './Header.scss';

export default function DisplayNameAlert() {
    const { currentUser } = useAuth();
    const [show, setShow] = useState(true);
    
    if (show && (!currentUser.displayName || !currentUser.photoURL)) {
        return (
            <Alert id="betaalert" variant="danger" dismissible onClose={() => setShow(false)}>
                TODO:
                {!currentUser.displayName ? <Link id="alert-link" to="/settings"> | set username | </Link> : <span></span>}
                {!currentUser.photoURL ? <Link id="alert-link" to="/settings"> | upload profile picture | </Link> : <span></span>}
            </Alert>
        )
    } else {
        return null;
    }
    
}
