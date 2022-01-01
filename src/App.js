import Login from './components/Login';
import Homepage from "./components/Homepage"
import Admin from './components/Admin';
import Causes from './components/Causes';
import Cause1 from './components/Cause1';
import Cause2 from './components/Cause2';
import Cause3 from './components/Cause3';
import Popup from './components/Popup';
import AdminPortal from './components/AdminPortal';
import AdminCause1 from './components/AdminCause1';
import AdminCause2 from './components/AdminCause2';
import AdminCause3 from './components/AdminCause3';
import GeneralFunds from './components/GeneralFunds'


import "./App.scss"
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';



export default function App() {

  return (

  <Router>
        <div className="button">
          <Switch>
            <Route exact path="/" children={<Homepage />}></Route>
            <Route path="/login" children={<Login />}></Route>
            <Route path="/admin" children={<Admin />}></Route>
            <Route path="/causes" children={<Causes />}></Route>
            <Route path="/cause1" children={<Cause1 />}></Route>
            <Route path="/cause2" children={<Cause2 />}></Route>
            <Route path="/cause3" children={<Cause3 />}></Route>
            <Route path="/popup" children={<Popup />}></Route>
            <Route path="/adminportal" children={<AdminPortal />}></Route>
            <Route path="/admincause1" children={<AdminCause1 />}></Route>
            <Route path="/admincause2" children={<AdminCause2 />}></Route>
            <Route path="/admincause3" children={<AdminCause3 />}></Route>
            <Route path="/generalfunds" children={<GeneralFunds />}></Route>
          </Switch>
        </div>
  </Router>      
  );
}




