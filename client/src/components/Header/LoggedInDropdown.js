import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.js';
import { NavDropdown } from 'react-bootstrap'
import './Header.scss';

const LoggedInDropdown = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
        await logout();
        history.push('/login');
    } catch (error) {
    }
  }

  //creates user JSON and adds to database
  const addToDB = async (sub, email, username, picture) => {
    try {
      const auth0User = `
      {"auth0_id": "${sub}",
      "email": "${email}",
      "username": "${username}",
      "picture_link": "${picture}",
      "color": "#ba7373"}`
      
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: auth0User
      });
      console.log(auth0User);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  //checks if the user is in the database. if they are not, they are added.
  const checkIfDB = async (sub, email, username, picture) => {
    //responseText = valid user if user is in database
    const response = await fetch(`/api/users/herecheck/${sub}`);
    const responseText = await response.text();
    if (responseText !== 'valid user') {
      //add to database function and set inDB to true
      addToDB(sub, email, username, picture);
    }
  };

  //sets cookies and database on each run
  useEffect(() => {
      checkIfDB(currentUser.uid, currentUser.email, currentUser.displayName, currentUser.photoURL);
  }, [])

  return (
    <NavDropdown className="mr-auto" title='myread50'>
        <NavDropdown.Item id="dropdown-link" href="#profile"><Link id="dropdown-link" to="/profile">profile</Link></NavDropdown.Item>
        <NavDropdown.Item id="dropdown-link" href="#settings"><Link id="dropdown-link" to="/settings">settings</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item id="sign-out" onClick={() => handleLogout()}>sign out</NavDropdown.Item>
    </NavDropdown>
  );
}

export default LoggedInDropdown;