import logo from './images/logo.svg'
import Login from "./Login";
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const Homepage= ({props}) => {
    return (

      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
            The Ripple Effect
            <p className='App-p'>
              A small donation from you goes a long way for someone in need.
            </p>
            <div className="footer">
              <button type="button" className="App-btn">
                <Link to="/login">
                    Login
                </Link>
              </button>
            </div>
        </header>
      </div>
    );
  }

  export default Homepage;
