import React from 'react'
import "./App.css";
import logo from "./img/logo.png";
import facebook from './img/facebook.png'
import linkedin from './img/linkedin.png'
import twitter from './img/twitter.png'

function App() {
  return (
    <div className="App">
      <div className="logoSpace">
        <img src={logo} className="logo" alt="logo" />
        <h1 id="company_name">Crypto Tracker</h1>
      </div>

      <div className="productHeadline">
        <h2 align="center" id="product_headline">Crypto Tracker: All your crypto in one place</h2>
        <h3 id="product_description">Crypto Tracker is a web app that allows you to easily manage your Crypto currency holdings in one place. Keep track of the prices and your profit/loss trends</h3>
      </div>
      <div>
        <h1 id="registration_heading"> Registration</h1>
        username <input type="text" id="username_field" />
        email <input type="text" id="email_field" />
        password <input type="text" id="password_field" />
        <button id="signup_button">signup</button>
      </div>
      <h3 id="features_heading">Features</h3>
      <ol id="features_list">
        <li className="feature">Add/Remove Crypto Assests</li>
        <li className="feature">Track Prices</li>
        <li className="feature">View PnL</li>
      </ol>
      <footer id="copyright_notice">
        <p> Copyright Crypto Tracker</p>
      </footer>
      <div>
        <a href="https://skillreactor.io" id="sm_links">
          <img src={facebook} id="sm_facebook" alt='facebook'/>
          <img src={linkedin} id="sm_linkedin" alt='linkedin'/>
          <img src={twitter} id="sm_twitter" alt='twitter'/>
        </a>
      </div>
    </div>
  );
}

export default App;
