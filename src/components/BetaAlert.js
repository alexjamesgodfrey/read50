import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import '../styles/BetaAlert.scss';

const BetaAlert = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert id="betaalert" variant="danger" dismissible onClose={() => setShow(false)}>
                welcome to the read50.com beta! view the <Alert.Link href="#">tutorial</Alert.Link> if you are starting out. please report bugs and suggest changes <Alert.Link>here</Alert.Link>.
            </Alert>
        )   
    } else {
        return null;
    }
    
}

export default BetaAlert;