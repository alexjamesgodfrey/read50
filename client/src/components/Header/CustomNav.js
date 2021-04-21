import { useState } from 'react';
import { NavLink, Redirect, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap';
import LoggedInDropdown from './LoggedInDropdown.js';
import NotLoggedInDropdown from './NotLoggedInDropdown.js';
import './Header.scss';

const CustomNav = () => {
  const { currentUser } = useAuth();
  //state for search field
  const [field, setField] = useState("brandon sanderson");
  //fetches url
  const location = useLocation();
  //gets the first part of url (where /search will potentially be)
  const [here, setHere] = useState(location.pathname.slice(0, 7));
  //set to true if redirect is needed
  const [redirect, setRedirect] = useState(false);
  //link for book memory
  const [append, setAppend] = useState(sessionStorage.getItem('searchField'));

  return (
    <div>
      {/*if redirect is true (search button is clicked), push to search page with field value*/}
      {redirect ?
        <Redirect push to={`/search/${field}`} />
        :
        <Navbar bg="danger" variant="dark" expand="lg">
          <NavLink to="/"><Navbar.Brand>read50.com</Navbar.Brand></NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="custom-nav">
              {append ? <NavLink activeClassName="selected-nav" className="nav-link" to={`/search/${sessionStorage.getItem('searchField')}`}>search</NavLink> : <NavLink activeClassName="selected-nav" className="nav-link" to="/search">search</NavLink>}
              <NavLink activeClassName="selected-nav" className="nav-link" to="/leaderboard">leaderboards</NavLink>
              <NavDropdown title='info'>
                <NavDropdown.Item id="dropdown-link" href="#tutorial"><Link id="dropdown-link" to="/tutorial">tutorial</Link></NavDropdown.Item>
                <NavDropdown.Item id="dropdown-link" href="#bugs"><Link id="dropdown-link" to="/bugs">bugs</Link></NavDropdown.Item>
                <NavDropdown.Item id="dropdown-link" href="#about"><Link id="dropdown-link" to="/about">about</Link></NavDropdown.Item>
              </NavDropdown>
              
              {(currentUser ? <LoggedInDropdown /> : <NotLoggedInDropdown />)}
            </Nav>
            <Nav>
              <NavLink className="nav-link" to="/profile/read">read</NavLink>
              <NavLink className="nav-link" to="/profile/want">want</NavLink>
              <NavLink className="nav-link" to="/profile/current">current</NavLink>
              <NavLink className="nav-link" to="/profile/dnf">dnf</NavLink>
            </Nav>
            <Nav>
              {/*if the url is /search, do not render the search field*/}
              {here === '/search' ?
                <span></span>
              :
                <Form flex>
                  <FormControl className="header-search-box" type="text" placeholder='quick search' onChange={(e) => setField(e.target.value)} />
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