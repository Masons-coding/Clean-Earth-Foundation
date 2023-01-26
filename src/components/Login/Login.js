import React from 'react';
import { useState} from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import './Login.scss';

import showIcon from "../../assets/images/icons/EyeIcon.svg";
import NotShowIcon from "../../assets/images/icons/CancelIcon.svg";

const USER_LOGIN = process.env.REACT_APP_USER_LOGIN_URL;

const API = process.env.REACT_APP_API_KEY;

const urlForLogin =`${USER_LOGIN}${API}`;


  

const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
      if(passwordShown === false){
        setShowOrHidePassword(NotShowIcon)
      }

      if(passwordShown === true){
        setShowOrHidePassword(showIcon)
      }

      setPasswordShown(!passwordShown);
    };

   const [showOrHidePassword, setShowOrHidePassword] = useState(showIcon)


  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
      if(email !== ""){
          setEmailError(false)
          setPasswordError(false)
          setErrorMessage("")
      }
  };

  const[password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if(password !== ""){
          setPasswordError(false)
          setEmailError(false)
          setErrorMessage("")
      }
  };

  const handleLoginSubmitForm = (event) => {
    event.preventDefault();
    const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if(password === ""){
      setPasswordError(true)
      setErrorMessage("Password or email is incorrect")
    }
    if(email === "" || emailValid === false){
      setEmailError(true)
      setErrorMessage("Password or email is incorrect")
    }

    if(passwordError === false && emailError === false && emailValid === true){
      axios
      .post((urlForLogin), {
          email: event.target.email.value,
          password: event.target.password.value,
      })
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.token);
        setSuccess(true);
      })
      .catch((error) => {
        if(error.response.data.message === "Invalid Credentials"){
          setPasswordError(true)
          setEmailError(true)
          setErrorMessage("Password or email is incorrect")
        }

      });
    }

  }

  return (
    <main className="login-page">
          <p className="login-page__sign-up">
            Need an account? <Link to="/signup">Sign up</Link>
          </p>
        <form autoComplete="off" onSubmit={handleLoginSubmitForm} className="login">
            <h1 className="login__title">Log in</h1>

            <label className="login__labels" htmlFor="first_name">Email:</label>
            <input type="text" placeholder="Enter email" value={email} onChange={handleEmailChange} className={emailError === true || passwordError === true ? 'login__input-error' : 'login__input' }  id="email" name="email"></input>
            <label className="login__labels" htmlFor="first_name">Password:</label>
            <div className="login__show-hide-password-container">
              <input type={passwordShown ? "text" : "password"} placeholder="Enter password" value={password} onChange={handlePasswordChange} className={passwordError === true || emailError === true ? 'login__input-error' : 'login__input' }  id="password" name="password"></input>
              <img src={showOrHidePassword} alt="Show or hide password" className="login__show-password" onClick={togglePassword}/>
            </div>

            <div className={passwordError === true || emailError === true ? 'login__error-message' : 'login__error-message-hidden' }>{errorMessage}</div>

            <button className="login__button">Log in</button>
            {success && <Navigate to="/"/>}

        </form>
    </main>
  );
};

export default Login;