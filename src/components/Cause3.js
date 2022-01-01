import cause3 from './images/hxn.jpg'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import userAddress from './userAddress';
import {FUNDRAISER_ADDRESS, FUNDRAISER_ABI} from './config.js'
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const Cause3= ({props}) => {
  const [cause3Title, setCause3Title] = useState();
  const [cause3Desc, setCause3Desc] = useState();
  const [targetAmount, setTargetAmount] = useState();
  const [donatedAmount, setDonatedAmount] = useState();

  const [toDonate, setToDonate] = useState();

  useEffect(() => {
  async function load() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")

    const contract = new ethers.Contract(
      FUNDRAISER_ADDRESS, FUNDRAISER_ABI, provider
    )

    const causeNames = await contract.getCauseNames();
    setCause3Title(String(causeNames[2]));

    const desc3 = String(await contract.getCauseDesc(cause3Title));
    setCause3Desc(String(desc3));

    const target = await contract.getCauseTargetAmount(cause3Title);
    const donated = await contract.getCauseDonatedAmount(cause3Title);

    setTargetAmount(String(target));
    setDonatedAmount(String(donated));
  }

  load();
 }, []);

function updateAmount(event) {
  setToDonate(event.target.value);
}

function donateAmount(event) {
  async function load() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
    const signer = provider.getSigner(userAddress.value);

    const contract = new ethers.Contract(
      FUNDRAISER_ADDRESS, FUNDRAISER_ABI, signer
    );

    console.log(userAddress.value);
    console.log(toDonate);
    const var_ = await contract.donateToCause(cause3Title, {value: ethers.utils.parseEther(toDonate), from:userAddress.value});
  }

  load();
}


return (

    <div className="donate">
        <header className='header-cause'>
            <img src={cause3} className='img-cause'/>
                {cause3Title}
            <p className='p-cause'>
                {cause3Desc}
            </p>
            <p className='space'>
                Empty space
            </p>

            <p className='target-amount'>
                Target Amount = {targetAmount} ETH
            </p>

            <p className='current-amount'>
                Current Donations = {donatedAmount} ETH
            </p>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="amount" name="amount" placeholder="amount" onChange={updateAmount}/>
                </div>
            </div>

              <button type="button" className="donate-btn">
                <Link to="/popup" onClick={donateAmount}>
                    Donate
                </Link>
              </button>
        </header>
    </div>
);
}


export default Cause3;
