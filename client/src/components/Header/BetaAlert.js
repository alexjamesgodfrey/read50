import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './Header.scss';

const BetaAlert = () => {
    //state for showing alert
    const [show, setShow] = useState(true);
    //cookies for showing modal
    const [cookies, setCookie] = useCookies(['beta']);

    //if local show is true and there is no values for cookies.beta, show alert
    if (show===true && !(cookies.beta)) {
        return (
            <Alert id="betaalert" variant="danger" dismissible onClose={() => {
                setShow(false);
                setCookie('beta', true, { path: '/', maxAge: 1000000 });
            }}>
                welcome to the read50.com beta! view the <Link id="alert-link" to="/tutorial">tutorial</Link> if you are starting out. please report bugs and suggest changes <Link id="alert-link" to="/bugs">here</Link>.
            </Alert>
        )   
    } else {
        return null;
    }
    
}

export default BetaAlert;