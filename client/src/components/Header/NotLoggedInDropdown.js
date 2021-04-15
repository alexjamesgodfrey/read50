import { useAuth0 } from '@auth0/auth0-react';
import { Nav } from 'react-bootstrap';

const NotLoggedInDropdown = () => {
    //auth0 login function
    const { loginWithRedirect } = useAuth0();

    return (
        <Nav.Link onClick={() => loginWithRedirect()}>log in</Nav.Link>
    );
}

export default NotLoggedInDropdown;