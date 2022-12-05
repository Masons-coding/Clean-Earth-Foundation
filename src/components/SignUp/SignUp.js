import React from 'react';
import Input from "../../components/Input/Input";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.scss';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigateHomePage = useNavigate();

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("")

  const [firstName, setFirstName] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);

  const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
      if(firstName !== ""){
          setFirstNameError(false)
          setFirstNameErrorMessage("")
      }
  };


  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
      if(email !== ""){
          setEmailError(false)
          setEmailErrorMessage("")
      }
  };


  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("")
  const [lastName, setlastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const handleLastNameChange = (event) => {
      setlastName(event.target.value);
      if(lastName !== ""){
        setLastNameError(false)
        setLastNameErrorMessage("")
      }
  };


  const [phoneErrorMessage, setPhoneErrorMessage] = useState("")
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const handlePhoneChange = (event) => {
      setPhone(event.target.value);
      if(phone !== ""){
          setPhoneError(false)
          setPhoneErrorMessage("")
      }
  };



  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if(password !== ""){
          setPasswordError(false)
          setPasswordErrorMessage("")
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(password === ""){
        setPasswordError(true)
        event.target.password.focus()
        setPasswordErrorMessage("Field required - please enter a password")
    }
    const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if(email === "" || !emailValid){
        setEmailError(true)
        event.target.email.focus()
        setEmailErrorMessage("Field required - please enter a valid email address")
    }
    if(phone === ""){
        setPhoneError(true)
        event.target.phone.focus()
        setPhoneErrorMessage("Field required - please enter a valid cell phone number")
    }
    if(lastName === ""){
        setLastNameError(true)
        event.target.lastName.focus()
        setLastNameErrorMessage("Field required - please enter your first name")
    }
    if(firstName === ""){
        setFirstNameError(true)
        event.target.firstName.focus()
        setFirstNameErrorMessage("Field required - please enter your first name")
    }
  }

  const handleCancelClick = () => {
    navigateHomePage("/")
    window.scrollTo(0, 0)
  };

  return (
    <main className="signup-page">
            <form onSubmit={handleSubmit} className='sign-up'>
                <h1 className="signup__title">Sign up</h1>
                <label className="sign-up__labels" htmlFor="first_name">First Name:</label>
                <input type="text" placeholder="Please enter your first name" value={firstName} onChange={handleFirstNameChange} className={firstNameError === true ? 'sign-up__input-error' : 'sign-up__input' }  id="firstName" name="firstName"></input>
                <div className="sign-up__error-message">{firstNameErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="last_name">Last Name:</label>
                <input type="text" placeholder="Please enter your last name" value={lastName} onChange={handleLastNameChange} className={lastNameError === true ? 'sign-up__input-error' : 'sign-up__input' } id="lastName" name="lastName"></input>
                <div className="sign-up__error-message">{lastNameErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="phone">Cell Phone:</label>
                <input type="text" placeholder="Please enter your cell phone #" value={phone} onChange={handlePhoneChange} className={phoneError === true ? 'sign-up__input-error' : 'sign-up__input' } id="phone" name="phone"></input>
                <div className="sign-up__error-message">{phoneErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="email">Email:</label>
                <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true ? 'sign-up__input-error' : 'sign-up__input' } id="email" name="email"></input>
                <div className="sign-up__error-message">{emailErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="name">Password:</label>
                <input type="text" placeholder="Please enter your password" value={password} onChange={handlePasswordChange} className={passwordError === true ? 'sign-up__input-error' : 'sign-up__input' } id="password" name="password"></input>
                <div className="sign-up__error-message">{passwordErrorMessage}</div>

                <div className="sign-up__button-container">
                    <p className="signup-page__log-in">
                        Have an account? <Link to="/login">Log in</Link>
                    </p>
                    <button type="submit" className="sign-up__button">Sign up</button>
                    <button onClick={handleCancelClick} className="sign-up__button">Cancel</button>
                </div>
                {success && <div className="signup__message">Signed up!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>

    </main>
  );
};

export default Signup;