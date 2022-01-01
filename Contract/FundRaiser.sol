// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.1;
pragma experimental ABIEncoderV2; // allows returning array

contract FundRaiser {

	modifier onlyAdmin {																														// for when we need admin only access
		require(msg.sender == admin, "Only admin is allowed");
		_;
	}

	// convert wei to ether
	function weiToEther(uint _weiAmt) internal pure returns (uint) {
		return _weiAmt / 1000000000000000000; 																				// multiply by 10(^18)
	}

	// convert ether to wei
	function etherToWei(uint _etherAmt) internal pure returns (uint) {
		return _etherAmt * 1000000000000000000;																				// divide by 10(^18)
	}

	struct cause {
		address payable causeAddr;																										// the payable address of the cause
		string title;																																	// the cause title (unique identifier)
		string desc;																																	// the cause description
		uint targetAmount;																														// target amount to be raised
		uint donatedAmount;																														// donated amount so far
		uint deadline;																																// the deadline block number
		bool acceptingDonations;																											// if open to donations or not
	}

	address public admin;																														// admin doesn't need to be payable (shouldn't be payable)
	string[] public causeTitles; 																										// save every cause the admin adds
	uint public generalFundAmount;																									// this is the general fund that admin will allocate to causes
	address[] public userAddresses;																									// save user addresses
	mapping(string => cause) causeMap;																							// map title to a cause, title unique identifier
	mapping(string => uint) generalAllocations; 																		// this keeps track of how admin distributes general funds
	mapping(string => mapping(address => uint)) userDonations;											// cause title => user address => donated amount

	constructor() {
		admin = payable(msg.sender); 																									// admin deploys the contract
	}

