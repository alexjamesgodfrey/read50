import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BetaAlert from './BetaAlert.js';
import CustomNav from './CustomNav.js';
import '../styles/Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {

  return (
    <header>
      <BetaAlert />
      <CustomNav />
    </header>
  )
  
}

export default Header;

