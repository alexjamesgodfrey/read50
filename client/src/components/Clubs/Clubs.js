import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import Loading from '../Loading.js';
import ClubLogo from '../../images/clubs.png';
import './Clubs.scss';

const Clubs = (props) => {
  const [load, setLoad] = useState(true);

  const loadingFunc = async ms => {
    await props.sleep(ms);
    setLoad(false);
  }

  useEffect(() => { 
    loadingFunc(1250);
  })


  //controls loading state
  if (load) {
    return (
      <Loading />
    )
  }

    return (
        <div className="clubs">
            <Header />
            <div className="main">
                <img className="club-logo" alt="club-logo" src={ClubLogo} />
                <h2>Read50 clubs coming soon</h2>
            </div>
        </div>
        
    )
}

export default Clubs;