import general from './images/general_funds.svg'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import userAddress from './userAddress';
import {FUNDRAISER_ADDRESS, FUNDRAISER_ABI} from './config.js'
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const GeneralFunds= ({props}) => {

  const [generalFundAmt, setGeneralFundAmt] = useState();
  const [toDonate, setToDonate] = useState();

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
     const var_ = await contract.donateGeneral({value: ethers.utils.parseEther(toDonate), from:userAddress.value});
   }

   load();
 }


return (

    <div className="donate">
        <header className='header-cause'>

            <img src={general} className='gen-img'/>
            <p className='space'>
                Empty space
            </p>
                General Funds Donation!
            <p className='p-cause'>
                Want to help out but have nothing specific in mind? Don't worry - let us make the decision for you.
            </p>
            <p className='p-cause'>
                Donate to our general funds and have a hand in aiding many causes.
            </p>

            <p className='space'>
                Empty space
            </p>

            <p className='current-amount'>
                Current Funds = {generalFundAmt} ETH
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


export default GeneralFunds;
