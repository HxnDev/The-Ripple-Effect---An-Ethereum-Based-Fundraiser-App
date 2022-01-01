# The Ripple Effect (An Ethereum-Based Fundraiser App)

<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/extras/logo.png">
</p>


## Description:

The Ripple Effect is a blockchain based de-centralized application that aims to bring transparency to the process of fundraising and managing donations for various types of charities. Our blockchain is built with Ethereum, using Ganache and Truffle to manage it. For the frontend (interface), we are using ReactJS. Fundraising and donations is a process that is typically not transparent or easily accountable. By introducing our blockchain into the process, we are making sure that anyone can view the donation and allocation transactions and track where money comes from and where it goes too. This makes the whole process transparent.

## Requirements:

#### 1: NodeJS:
Node JS is an asynchronous event-driven JavaScript runtime. It is used to build scalable network applications. It can be easily installed by downloading the latest **LTS Release** from : https://nodejs.org/en/ (version 16.9.0)

#### 2: Ganache:
Ganache is a personal blockchain for Ethereum development that can be used to deploy contracts, develop applications and run tests. It can be easily installed by downloading from : https://trufflesuite.com/ganache/ (version 2.13.2)

#### 3: Truffle:
Truffle is a world class development environment, testing framework and asset pipeline for blockchains using the EVM (Ethereum Virtual Machine) aiming to make life as a developer easy. 
It can be easily installed by typing the following in the command prompt : **npm -g install truffle** (version 5.4.25)

#### 4: React Router Dom:
React Router DOM enables you to implement dynamic routing in a web app. React Router DOM facilitates component-based routing according to the needs of the app and platform.
It can be easily installed by typing the following in the command prompt : **npm install react-router-dom** (version 6.2.1)

#### 5: Ethers.JS:
The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. It can be installed using: **npm install ethers** (version 5)

#### 6: SASS:
Sass (which stands for 'Syntactically awesome style sheets) is an extension of CSS that enables you to use things like variables, nested rules, inline imports and more. It also helps to keep things organized and allows you to create style sheets faster. 
It can be installed using: **npm install sass** (version 7.0.0)

#### 7: Create React App:
Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration. 
It can be simply installed using: **npm install create-react-app** (version 5.0.0)

## Functionalities:
The Ripple Effect offers the following functionalities:
1.	The user should be able to donate funds (admin will allocate - see point 6)
2.	The user should be able to donate to a specific cause
3.	The user should be able to view how much they have contributed overall
4.	The user should be able to view the funding for each cause
5.	The admin user should be able to view donated funds
6.	The admin user should be able to allocate funds to a cause
7.	Once the goal amount has been reached for a cause, it should be closed for donations
8.	If there is a time limit for donation/cause then it will no longer receive funds if limit has expired
9.	User will call on payable function of contract
10.	There will be a function to transfer money from one contract to another (for allocating funds)

## Implementation Details:

### 1: Frontend:

First step is to know the flow of our program. The flow can be shown by the following flowchart:

<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/extras/flow.png">
</p>

We created 12 different pages for the frontend and then connected them using switches from **react-router-dom**. We furthermore created a customized styling class named **Style.scss** that has different styles for different classes/containers. 

Some screenshots of our interfaces can be seen as follows:

<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/1%20homepage.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/2%20user_login_page.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/3%20user_causes_list.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/4%20user_cause1.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/6.5%20general_funds_donation.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/7%20payment_successful.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/8%20payment_unsuccessful.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/9%20admin_login.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/10%20admin_dashboard.png">
</p>
<p align="center">
  <img src="https://github.com/HxnDev/The-Ripple-Effect---An-Ethereum-Based-Fundraiser-App/blob/main/Frontend%20Screenshots/11%20admin_allocate_funds.png">
</p>


