import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Loading from './components/Loading.js';
import ClubLogo from './images/clubs.png';
import './styles/Clubs.scss';

const Clubs = (props) => {
  const [load, setLoad] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

  const loadingFunc = async ms => {
    await props.sleep(ms);
    setLoad(false);
    console.log('success');
  }

  useEffect(() => { 
    loadingFunc(1250);
  }, [])


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
                <img className="club-logo" src={ClubLogo} />
                <h2>Read50 clubs coming soon</h2>
            </div>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        
    )
}

export default Clubs;