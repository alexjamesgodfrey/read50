import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../Header/Header.js';
import Loading from '../Loading.js';
import Books from './Books.js';

const SearchPage = (props) => {
  const { user, isAuthenticated  } = useAuth0();

  const [load, setLoad] = useState(true);

  const loadingFunc = async ms => {
    await props.sleep(ms);
    setLoad(false);
  }

  useEffect(() => { 
    loadingFunc(1250);
    if (isAuthenticated) {
      props.checkIfDB(user.sub, user.email, user['https://www.read50.com/username'], user.picture, user['https://www.read50.com/logincount']);
    }
  }, [])


  //controls loading state
  if (load) {
    return (
      <Loading />
    )
  }
  
  return (
    <div className="App">
      <Header />
      <Books />
    </div>
  );
}


export default SearchPage;
