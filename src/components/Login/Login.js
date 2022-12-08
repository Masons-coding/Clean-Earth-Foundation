import React from 'react';
import { useState} from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import './Login.scss';

const Login = () => {
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

    if(password === ""){
      setPasswordError(true)
    }
    const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if(email === "" || !emailValid){
      setEmailError(true)
    }

    axios
      .post("http://localhost:8080/users/login", {
          email: event.target.email.value,
          password: event.target.password.value,
      })
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.token);
        setSuccess(true);
      })
      .catch(() => {
        setErrorMessage("Password or email is incorrect")
      });
  }

  return (
    <main className="login-page">
        <form autoComplete="off" onSubmit={handleLoginSubmitForm} className="login">
            <h1 className="login__title">Log in</h1>

            <label className="login__labels" htmlFor="first_name">Email:</label>
            <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true || passwordError === true ? 'login__input-error' : 'login__input' }  id="email" name="email"></input>
            <label className="login__labels" htmlFor="first_name">Password:</label>
            <input type="password" placeholder="Please enter your password" value={password} onChange={handlePasswordChange} className={passwordError === true || emailError === true ? 'login__input-error' : 'login__input' }  id="password" name="password"></input>
            
            <div className={passwordError === true || emailError === true ? 'login__error-message' : 'login__error-message-hidden' }>{errorMessage}</div>

            <button className="login__button">Log in</button>
            {success && <Navigate to="/"/>}

        </form>
        <p className="login-page__sign-up">
            Need an account? <Link to="/signup">Sign up</Link>
        </p>
    </main>
  );
};

export default Login;