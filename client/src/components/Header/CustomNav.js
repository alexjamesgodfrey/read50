import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav } from 'react-bootstrap';
import LoggedInDropdown from './LoggedInDropdown.js';
import NotLoggedInDropdown from './NotLoggedInDropdown.js';
import './Header.scss';

const CustomNav = () => {
  const { isAuthenticated } = useAuth0();

    return (
      <Navbar bg="danger" variant="dark" expand="sm">
      <Navbar.Brand id="nav-link" href="./">read50.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav bg="danger">
          <Link to="/"><Navbar.Text id="nav-link">home</Navbar.Text></Link>
          <Link to="/search"><Navbar.Text id="nav-link">search</Navbar.Text></Link>
          <Link to="/clubs"><Navbar.Text id="nav-link">clubs</Navbar.Text></Link>
          <Link to="/leaderboard"><Navbar.Text id="nav-link">leaderboard</Navbar.Text></Link>
          <Link to="/search"><Navbar.Text id="nav-link">about</Navbar.Text></Link>
          {(isAuthenticated ? <LoggedInDropdown /> : <NotLoggedInDropdown />)}
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    )   
    
}

export default CustomNav;