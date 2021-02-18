import React from 'react';
import BetaAlert from './BetaAlert.js';
import CustomNav from './CustomNav.js';
import './Header.scss';
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

