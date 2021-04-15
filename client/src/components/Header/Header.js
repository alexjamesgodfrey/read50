import 'bootstrap/dist/css/bootstrap.min.css';
import BetaAlert from './BetaAlert.js';
import CustomNav from './CustomNav.js';

const Header = () => {
  return (
    <header>
      <BetaAlert />
      <CustomNav />
    </header>
  )
}

export default Header;

