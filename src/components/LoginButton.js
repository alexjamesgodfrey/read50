import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

const LoginButton = (props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    //props: text on button

    if (isAuthenticated) {
        return (
            <Link to="/search"> <Button variant="success" size="lg">{props.text}</Button> </Link> 
        )
    } else {
        return (
            <Button variant="success" size="lg" onClick={() => loginWithRedirect()}>{props.text}</Button>
        );
    }
    
}

export default LoginButton;