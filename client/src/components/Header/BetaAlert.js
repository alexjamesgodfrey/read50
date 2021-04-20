import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './Header.scss';

const BetaAlert = () => {
    //state for showing alert
    const [show, setShow] = useState(true);
    //cookies for showing modal
    const [closedSession, setClosedSession] = useState(sessionStorage.getItem('alert'));

    //if local show is true and there is no values for cookies.beta, show alert
    if (show===true && !closedSession) {
        return (
            <Alert id="betaalert" variant="danger" dismissible onClose={() => {
                setShow(false);
                sessionStorage.setItem('alert', false);
                setClosedSession(false);
            }}>
                welcome to the read50.com beta! view the <Link id="alert-link" to="/tutorial">tutorial</Link> if you are starting out. please report bugs and suggest changes <Link id="alert-link" to="/bugs">here</Link>.
            </Alert>
        )   
    } else {
        return null;
    }
    
}

export default BetaAlert;