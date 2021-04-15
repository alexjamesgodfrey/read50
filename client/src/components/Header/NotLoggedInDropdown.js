import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NotLoggedInDropdown = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Nav.Link onClick={() => loginWithRedirect()}>sign up / log in</Nav.Link>
    );
}

export default NotLoggedInDropdown;