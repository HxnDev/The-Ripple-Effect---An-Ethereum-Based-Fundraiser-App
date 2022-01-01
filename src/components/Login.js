import React from "react"
import loginimage from "./images/login.svg"
import "./style.scss"
import Admin from "./Admin";
import Causes from "./Causes";
import userAddress from './userAddress';
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function updateAddress(event) {
  userAddress.value = event.target.value;
  console.log(userAddress.value);
}

const Login= ({props})=>{

  return (
        <div className="base-container" style={{marginTop: 150}}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginimage} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Address</label>
                        <input type="text" name="address" placeholder="address" onChange={updateAddress}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="login-btn">
                    <Link to="/causes">
                        Login
                    </Link>
                </button>
            </div>
            <div className="header">
                <button type="button" className="admin-btn" >
                <Link to="/admin">
                    Admin
                </Link>
                </button>
            </div>
        </div>
  );
}

export default Login;
