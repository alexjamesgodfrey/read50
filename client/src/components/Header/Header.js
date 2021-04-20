import 'bootstrap/dist/css/bootstrap.min.css';
import BetaAlert from './BetaAlert.js';
import CustomNav from './CustomNav.js';
import DisplayNameAlert from './DisplayNameAlert.js';

const Header = () => {
  return (
    <header>
      <BetaAlert />
      <DisplayNameAlert />
      <CustomNav />
    </header>
  )
}

export default Header;

