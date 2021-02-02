import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BetaAlert from './BetaAlert.js';
import CustomNav from './CustomNav.js';
import Read50Text from '../images/read50text.png';
import Search from '../Search.js';
import '../styles/Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';


const Header = (props) => {

  const { user, isAuthenticated, isLoading } = useAuth0(); 

  return (
    <header>
      <BetaAlert />
      <CustomNav />
    </header>
    
  )
}

export default Header;

