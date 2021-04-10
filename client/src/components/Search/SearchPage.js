import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../Header/Header.js';
import Loading from '../Loading.js';
import Books from './Books.js';

const SearchPage = (props) => {
  const { user, isAuthenticated  } = useAuth0();

  // const [load, setLoad] = useState(true);

  // const loadingFunc = async ms => {
  //   await props.sleep(ms);
  //   setLoad(false);
  // }

  // useEffect(() => { 
  //   loadingFunc(500);
  // }, [])


  // //controls loading state
  // if (load) {
  //   return (
  //     <Loading title={'loading search page'} desc={'we utilize the google books api, which contains over 40 million books'}/>
  //   )
  // }
  
  return (
    <div className="App">
      <Header />
      <Books />
    </div>
  );
}


export default SearchPage;
