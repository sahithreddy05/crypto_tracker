import React, { useState } from 'react'
import "./App.css";
import logo from "./img/logo.png";
import facebook from './img/facebook.png'
import linkedin from './img/linkedin.png'
import twitter from './img/twitter.png'
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log(username)
    axios.post("https://components.skillreactor.io/CryptoPortfolioTracker/sahith05/registration-service", {
      username: username,
      email: email,
      password: password
    })
      .then(res => {
        let statusCode = res.status;
        console.log(statusCode);
        if (statusCode == 201) {
          document.getElementById('submit_success').innerHTML = "Success, username accepted";
        }
      })
      .catch(err => {
        console.log(err);
        document.getElementById('signup_error').innerHTML = "Error: Unable to signup, please fill all the details";
      })
  }
  return (
    <div className="App">
      <div className="logoSpace">
        <img src={logo} id="logo" alt="logo" />
        <h1 id="company_name">Crypto Tracker</h1>
      </div>

      <div className="product_headline">
        <h2 align="center" id="product_headline">Crypto Tracker: All your crypto in one place</h2>
        <h3 id="product_description">Crypto Tracker is a web app that allows you to easily manage your Crypto currency holdings in one place. Keep track of the prices and your profit/loss trends.</h3>
      </div>

      <h3 id="features_heading">Features</h3>
      <ol id="features_list">
        <li className="feature" >Add/Remove Crypto Assets</li>
        <li className="feature">Track Prices</li>
        <li className="feature">View PnL</li>
      </ol>
      <div className='registration-login-div'>
        <div className='registration-div'>
          <h1 id="registration_heading"> Registration</h1>
          username <input value={username} onChange={handleUsername} type="text" id="username_field" />
          email <input value={email} onChange={handleEmail} type="text" id="email_field" />
          password <input value={password} onChange={handlePassword} type="text" id="password_field" />
          <button id="signup_button" onClick={handleSubmit}>Signup</button>
          <p id="submit_success"></p>
          <p id="signup_error"></p>
        </div>

        <div className='login-div'>
          <h1 id="login-heading"> Login</h1>
          username <input type="text" id="username_field" />
          password <input type="text" id="password_field" />
          <button id="login_button">Login</button>
        </div>
      </div>

      <footer id="copyright_notice">
        <p> Copyright Crypto Tracker</p>
      </footer>
      <div>
        <a href="https://skillreactor.io" id="sm_links">
          <img src={facebook} id="sm_facebook" alt='facebook' />
          <img src={linkedin} id="sm_linkedin" alt='linkedin' />
          <img src={twitter} id="sm_twitter" alt='twitter' />
        </a>
      </div>
    </div>
  );
}

export default App;
