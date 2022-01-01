import cause1 from './images/afghanistan.jpg'
import cause2 from './images/palestine.jpg'
import cause3 from './images/hxn.jpg'
import logo from './images/logo.svg'

import { ethers } from 'ethers';
import userAddress from './userAddress';
import React, { useEffect, useState } from 'react';
import {FUNDRAISER_ADDRESS, FUNDRAISER_ABI} from './config.js'
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const AdminPortal= ({props}) => {
return (
    <div className='dashboard' style={{marginTop: 150}}>
            <Admin/>
            <CausesList/>
            <Logo/>
    </div>
);
}

function Logo(){
    return(
        <div className='App'>
            <img src={logo} className='admin-logo' alt='logo' />
        </div>
    );

}

function Admin(){

  const [generalFundAmt, setGeneralFundAmt] = useState();

  useEffect(() => {
  async function load() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")

    const contract = new ethers.Contract(
      FUNDRAISER_ADDRESS, FUNDRAISER_ABI, provider
    )

    const amt = await contract.getGeneralFundsAvailable();
    setGeneralFundAmt(String(amt));
  }

  load();
 }, []);

    return(
        <div className="portal">
            Welcome To Admin Dashboard!

            <p className='space'>
                Empty space
            </p>

            <p className='portal-balance'>
                General Funds Available = {generalFundAmt} ETH
            </p>
        </div>
    );

}
function CausesList(){
  const [cause1Title, setCause1Title] = useState();
  const [cause2Title, setCause2Title] = useState();
  const [cause3Title, setCause3Title] = useState();

  const [cause1Desc, setCause1Desc] = useState();
  const [cause2Desc, setCause2Desc] = useState();
  const [cause3Desc, setCause3Desc] = useState();

  const [cause1Status, setCause1Status] = useState();
  const [cause2Status, setCause2Status] = useState();
  const [cause3Status, setCause3Status] = useState();

  useEffect(() => {
  async function load() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")

    const contract = new ethers.Contract(
      FUNDRAISER_ADDRESS, FUNDRAISER_ABI, provider
    )

    const causeNames = await contract.getCauseNames();
    setCause1Title(causeNames[0]);
    setCause2Title(causeNames[1]);
    setCause3Title(causeNames[2]);

    const desc1 = String(await contract.getCauseDesc(cause1Title));
    const desc2 = String(await contract.getCauseDesc(cause2Title));
    const desc3 = String(await contract.getCauseDesc(cause3Title));

    setCause1Desc(String(desc1));
    setCause2Desc(String(desc2));
    setCause3Desc(String(desc3));

    const status1 = await contract.getCauseDonationAcceptance(cause1Title);
    const status2 = await contract.getCauseDonationAcceptance(cause2Title);
    const status3 = await contract.getCauseDonationAcceptance(cause3Title);

    setCause1Status(status1);
    setCause2Status(status2);
    setCause3Status(status3);
  }

  load();
 }, []);

    return (
        <div className="Causes-wrapper">
            <Cause img={cause1} title={cause1Title} desc = {cause1Desc} add = "/admincause1" add1 = '/popup'/>
            <Cause img={cause2} title={cause2Title} desc = {cause2Desc} add = "/admincause2" add1 = '/popup'/>
            <Cause img={cause3} title={cause3Title} desc = {cause3Desc} add = "/admincause3" add1 = '/popup'/>
        </div>
    );
}

function Cause(props){
  function confirmPayment(title) {
    async function load() {
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
      const signer = provider.getSigner(userAddress.value);

      const contract = new ethers.Contract(
        FUNDRAISER_ADDRESS, FUNDRAISER_ABI, signer
      );

      console.log(userAddress.value);
      console.log(title);
      const var_ = await contract.confirmDonationsForCause(title);
    }

    load();
  }

    return(
        <div className="Cause">
            <div className="Cause-body">
                <img src={props.img} className='Cause-img'/>
                <h2 className="cause-title">
                   {props.title}
                </h2>
                <p className="cause-des">
                    {props.desc}
                </p>
            </div>
            <button className='cause-btn'>
                <Link to={props.add}>
                    Allocate Funds
                </Link>
            </button>

            <button className='cause-btn'>
                <Link to={props.add1} onClick= {() => confirmPayment(props.title)}>
                    Confirm Payment
                </Link>
            </button>
        </div>
    )
}

export default AdminPortal;
