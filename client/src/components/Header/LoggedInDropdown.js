import { useEffect } from 'react';
import { useCookies  } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { NavDropdown } from 'react-bootstrap'
import './Header.scss';

const LoggedInDropdown = () => {
  //auth0 user and logout
  const { user, logout } = useAuth0();
  //auth0 sub cookie and username cookie
  const [cookies, setCookie] = useCookies(['auth0', 'username', 'picture']);

  //sets auth0 and username cookie (age three hours)
  const setAuth = async () => {
    setCookie('auth0', user.sub, { path: '/', maxAge: 10800 });
    setCookie('username', user['https://www.read50.com/username'], { path: '/', maxAge: 10800 });
    setCookie('picture', user.picture, { path: '/', maxAge: 10800 });
  }

  //creates user JSON and adds to database
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

  //checks if the user is in the database. if they are not, they are added.
  const checkIfDB = async (sub, email, username, picture, logcount) => {
    //responseText = valid user if user is in database
    const response = await fetch(`/api/users/herecheck/${sub}`);
    const responseText = await response.text();
    if (responseText !== 'valid user') {
      //add to database function and set inDB to true
      addToDB(sub, email, username, picture, logcount);
    }
  };

  //sets cookies and database on each run
  useEffect(() => {
      setAuth();
      checkIfDB(user.sub, user.email, user['https://www.read50.com/username'], user.picture, user['https://www.read50.com/logincount']);
  }, [])

  return (
    <NavDropdown className="mr-auto" title='myread50'>
        <NavDropdown.Item id="dropdown-link" href="#profile">profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item id="dropdown-link" onClick={() => logout()}>sign out</NavDropdown.Item>
    </NavDropdown>
  );
}

export default LoggedInDropdown;