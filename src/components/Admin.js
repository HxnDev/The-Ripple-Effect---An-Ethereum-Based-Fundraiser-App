import React from "react";
import userAddress from './userAddress';
import loginimg from "./images/admin.jpg"

import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function updateAddress(event) {
  userAddress.value = event.target.value;
  console.log(userAddress.value);
}

const Admin = ({props}) => {
        return (

            <div className="base-container" style={{marginTop: 150}}>
                <div className="login-header">Admin</div>
                <div className="content">
                    <div className="image">
                        <img src={loginimg} />
                    </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="admin_address">Address</label>
                        <input type="text" name="admin_address" placeholder="admin_address" onChange={updateAddress} />
                    </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" />
                </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="login-btn">
                    <Link to="/adminportal">
                        Login
                    </Link>
                </button>
                </div>
            </div>
        );
}

export default Admin;
