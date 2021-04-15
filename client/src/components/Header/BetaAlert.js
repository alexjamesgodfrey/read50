import { useState } from 'react';
import { useCookies  } from 'react-cookie';
import Alert from 'react-bootstrap/Alert';
import './BetaAlert.scss';

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
                console.log(cookies.beta);
            }}>
                welcome to the read50.com beta! view the <Alert.Link href="#">tutorial</Alert.Link> if you are starting out. please report bugs and suggest changes <Alert.Link>here</Alert.Link>.
            </Alert>
        )   
    } else {
        return null;
    }
    
}

export default BetaAlert;