import React, { useEffect } from 'react';
import { useCookies  } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { NavDropdown } from 'react-bootstrap'
import './Header.scss';

const LoggedInDropdown = () => {
    const { user, logout } = useAuth0();
    const [cookies, setCookie] = useCookies(['auth0', 'username']);

    const setAuth = async () => {
      setCookie('auth0', user.sub, { path: '/', maxAge: 3600 });
      setCookie('username', user['https://www.read50.com/username'], { path: '/', maxAge: 3600 });
      console.log('auth0 cookie set to ' + cookies.auth0);
      console.log('username cookie set to ' + cookies.username);
    }

    const addToDB = async (sub, email, username, picture, logcount) => {
    try {
      const auth0User = `
      {"auth0_id": "${sub}",
      "email": "${email}",
      "username": "${username}",
      "picture_link": "${picture}",
      "logincount": "${logcount}",
      "color": "#ba7373"}`
      
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: auth0User
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  //function sets this.state.inDB to true, if user is in postgresDB, else adds and sets to true
  //params: user's auth0 id
  const checkIfDB = async (sub, email, username, picture, logcount) => {
    //responseText = valid user if user is in database
    const response = await fetch(`/api/users/herecheck/${sub}`);
    const responseText = await response.text();
    if (responseText !== 'valid user') {
      //add to database function and set inDB to true
        addToDB(sub, email, username, picture, logcount);
        console.log('added to db');
    }
  };

    useEffect(() => {
        setAuth();
        checkIfDB(user.sub, user.email, user['https://www.read50.com/username'], user.picture, user['https://www.read50.com/logincount']);
    }, [])

    return (
        <NavDropdown className="mr-auto" id="myread50" title={<span id="nav-link">myread50</span>}>
            <NavDropdown.Item id="dropdown-link" href="#profile">profile</NavDropdown.Item>
            <NavDropdown.Item id="dropdown-link" href="#action/3.3">friends</NavDropdown.Item>
            {/* <NavDropdown.Item id="dropdown-link" href="#action/3.3">clubs</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item id="dropdown-link" onClick={() => logout()}>sign out</NavDropdown.Item>
        </NavDropdown>
    );
}

export default LoggedInDropdown;