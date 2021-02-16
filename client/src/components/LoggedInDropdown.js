import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import '../styles/Header.scss';

const LoggedInDropdown = () => {
    const { logout } = useAuth0();
    return (
        <NavDropdown className="mr-auto" id="myread50" title={<span id="nav-link">myread50</span>}>
            <NavDropdown.Item id="dropdown-link" href="#profile">profile</NavDropdown.Item>
            <NavDropdown.Item id="dropdown-link" href="#action/3.3">friends</NavDropdown.Item>
            <NavDropdown.Item id="dropdown-link" href="#action/3.3">clubs</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item id="dropdown-link" onClick={() => logout()}>sign out</NavDropdown.Item>
        </NavDropdown>
    );
}

export default LoggedInDropdown;