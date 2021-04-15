import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import LoggedInDropdown from './LoggedInDropdown.js';
import NotLoggedInDropdown from './NotLoggedInDropdown.js';
import './Header.scss';

const CustomNav = () => {
  const { isAuthenticated } = useAuth0();
  const [field, setField] = useState("");
  const location = useLocation();
  const [here, setHere] = useState(location.pathname.slice(0, 7));
  const [redirect, setRedirect] = useState(false);


  const handleChange = (e) => {
    setField(e.target.value);
  }

    return (
      // <Navbar variant="dark" expand="sm">
      // <Navbar.Brand id="nav-link" href="./">read50.com</Navbar.Brand>
      // <Navbar.Toggle aria-controls="basic-navbar-nav" />
      // <Navbar.Collapse id="basic-navbar-nav">
      //   <Nav bg="danger">
      //     <NavLink activeStyle={{color: "800"}} to="/search"><Navbar.Text id="nav-link">search</Navbar.Text></NavLink>
      //     <NavLink to="/clubs"><Navbar.Text id="nav-link">clubs</Navbar.Text></NavLink>
      //     <NavLink to="/leaderboard"><Navbar.Text id="nav-link">leaderboard</Navbar.Text></NavLink>
      //     <NavLink to="/search"><Navbar.Text id="nav-link">about</Navbar.Text></NavLink>
      //     {(isAuthenticated ? <LoggedInDropdown /> : <NotLoggedInDropdown />)}
      //   </Nav>
      // </Navbar.Collapse>
      // </Navbar>
      <div>
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
                <div id="custom-nav-right">
                  {here === '/search' ?
                    <span></span>
                  :
                    <Form flex>
                      <FormControl type="text" placeholder='search' value={field} className="mr-sm-2" onChange={(e) => handleChange(e)} />
                      <Button type="submit" variant="outline-light" onClick={() => setRedirect(true)}>search</Button>
                    </Form>
                    }
                </div>
              </Nav>
            </Navbar.Collapse>
            
          </Navbar>
        }
        </div>
    )   
    
}

export default CustomNav;