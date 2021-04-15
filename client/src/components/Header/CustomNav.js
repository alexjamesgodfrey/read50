import { useState } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import LoggedInDropdown from './LoggedInDropdown.js';
import NotLoggedInDropdown from './NotLoggedInDropdown.js';
import './Header.scss';

const CustomNav = () => {
  const { isAuthenticated } = useAuth0();
  //state for search field
  const [field, setField] = useState("");
  //fetches url
  const location = useLocation();
  //gets the first part of url (where /search will potentially be)
  const [here, setHere] = useState(location.pathname.slice(0, 7));
  //set to true if redirect is needed
  const [redirect, setRedirect] = useState(false);

  return (
    <div>
      {/*if redirect is true (search button is clicked), push to search page with field value*/}
      {redirect ?
        <Redirect push to={`/search/${field}`} />
        :
        <Navbar bg="danger" variant="dark" expand="md">
          <NavLink to="/"><Navbar.Brand>read50.com</Navbar.Brand></NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="custom-nav">
              <NavLink activeClassName="selected-nav" className="nav-link" to="/search">search</NavLink>
              <NavLink activeClassName="selected-nav" className="nav-link" to="/leaderboard">leaderboards</NavLink>
              <NavLink activeClassName="selected-nav" className="nav-link" to="/about">about</NavLink>
              {(isAuthenticated ? <LoggedInDropdown /> : <NotLoggedInDropdown />)}
            </Nav>
            <Nav fixed="right">
                {/*if the url is /search, do not render the search field*/}
                {here === '/search' ?
                  <span></span>
                :
                  <Form flex>
                    <FormControl className="header-search-box" type="text" placeholder='search' value={field} onChange={(e) => setField(e.target.value)} />
                    <Button type="submit" variant="outline-light" onClick={() => setRedirect(true)}>search</Button>
                  </Form>
              }
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
      }
    </div>
  )   
    
}

export default CustomNav;