import cause1 from './images/afghanistan.jpg'
import cause2 from './images/palestine.jpg'
import cause3 from './images/hxn.jpg'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import userAddress from './userAddress';
import {FUNDRAISER_ADDRESS, FUNDRAISER_ABI} from './config.js'
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const Causes= ({props}) => {

return (
<div className='dashboard' style={{marginTop: 150}}>
            <User/>
            <CausesList/>
            <General_Funds_Button/>
    </div>
);

}

function General_Funds_Button(){
    return (
        <div className='portal'>
            <p className='space'>
                Empty space
            </p>

            <button className='gen-donation-btn'>
                <Link to="/generalfunds">
                    General Donation!
                </Link>
            </button>
        </div>
    );
}

function User(){
    const [balance, setBalance] = useState();

    useEffect(() => {
    async function load() {
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
      const weibalance = await provider.getBalance(userAddress.value);
      const ethBalance = ethers.utils.formatEther(weibalance);
      setBalance(String(ethBalance));
     }

    load();
   }, []);

    return(
        <div className="portal">
            Welcome To Your Dashboard!

            <p className='space'>
                Empty space
            </p>

            <p className='portal-balance'>
                Your Balance = {balance} ETH
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

    //const afg = "With the freezeing cold winter and collapsing economy, people of Afghanistan barely have anything to eat. Let us all come together to help them.";
    //const pal = "Due to the ongoing war, people have lost their homes, jobs, and their loved ones. Lets all come together and build Palestine back.";
    //const hxn = "He might seem a nice guy but in reality he is a mental patient. As he is just a student and thinks he is not mentally ill, he doesn't get treatment. Lets all contribute to get him treated (or get rid of him xD)";
return (
    <div className="Causes-wrapper">
        <Cause img={cause1} title= {cause1Title} desc = {cause1Desc} status = {cause1Status} add = "/cause1" />
        <Cause img={cause2} title= {cause2Title} desc = {cause2Desc} status = {cause2Status} add = "/cause2" />
        <Cause img={cause3} title= {cause3Title} desc = {cause3Desc} status = {cause3Status} add = "/cause3" />
    </div>
);
}


function Cause(props){
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
                    Donate Now!
                </Link>
            </button>
        </div>
    )
}

export default Causes;
