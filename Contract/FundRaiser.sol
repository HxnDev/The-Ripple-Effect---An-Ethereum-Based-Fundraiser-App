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
	// admin can add a cause
	function addCause(address _caddr, string memory _title, string memory _desc, uint _target, uint _timeThresh) external onlyAdmin {
		uint endTime = 0;

		// If there is a time limit
		if (_timeThresh != 0) {
			endTime = block.number + _timeThresh;																				// fix the deadline as current block number + the specified thresh
		}

		cause memory Cause = cause(payable(_caddr), _title, _desc, etherToWei(_target), 0, endTime, true);	// create the cause
		causeMap[_title] = Cause;																											// add cause to map
		causeTitles.push(_title);																											// add its title to the title array
	}

	// user can donate to a cause
	function donateToCause(string memory _title) payable public {
		bool causeExists = false;
		for (uint i = 0; i < causeTitles.length; i++) {																// iterate through causes
	    if (keccak256(bytes(causeTitles[i])) == keccak256(bytes(_title))) {					// compare titles
				causeExists = true;
				break;
			}
    }

		require(causeExists == true);																									// check that cause existed before (don't let user just add anything)
		require(causeMap[_title].acceptingDonations == true);													// cause should be flagged as accepting donations

		userDonations[_title][msg.sender] += msg.value;																// update the user donation records
		causeMap[_title].donatedAmount += msg.value;																	//  update the cause donation records

		bool addressAdded = false;																										// check that user address was not stored before
		for (uint i = 0; i < userAddresses.length; i++) {															// iterate through address
	    if (userAddresses[i] == msg.sender) {																				// compare addresses
				addressAdded = true;
				break;
			}
    }

		if (addressAdded == false) {
			userAddresses.push(msg.sender);																								// add user address
		}
	}

	// user can donate in general - refund not possible in this case
	// no need to keep track of who donated how much
	function donateGeneral() payable public {
		generalFundAmount += msg.value;																								// add paid amount to general fund
	}

	// admin allocates the general-donated-funds
	function allocateGeneralFunds(string memory _title, uint _amount) external onlyAdmin {
		bool causeExists = false;
		for (uint i = 0; i < causeTitles.length; i++) {
	    if (keccak256(bytes(causeTitles[i])) == keccak256(bytes(_title))) {
				causeExists = true;
				break;
			}
    }

		require(causeExists == true);																									// check that cause existed before (don't let user just add anything)
		require(_amount <= generalFundAmount);																				// only use the funds allocated for general purpose

		generalAllocations[_title] += _amount;																				// update the general fund records
		generalFundAmount -= _amount;																									// update the fund to reflect the allocation removal
	}
