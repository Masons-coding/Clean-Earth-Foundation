import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.scss';

import showIcon from "../../assets/images/icons/EyeIcon.svg";
import NotShowIcon from "../../assets/images/icons/CancelIcon.svg";

import 'react-phone-number-input/style.css'

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import PopupNoClose from '../PopUp/PopUpNoClose.js';

const SIGN_UP_PAGE = process.env.REACT_APP_SIGN_UP_URL;

const API = process.env.REACT_APP_API_KEY;

const signUpPageUrl =`${SIGN_UP_PAGE}${API}`;

const Signup = () => {

    const [isOpenAfterSuccess, setIsOpenAfterSuccess] = useState(false);

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

  const navigateHomePage = useNavigate();

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("")

  const [firstName, setFirstName] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);

  const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
      if(firstName !== " "){
          setFirstNameError(false)
          setFirstNameErrorMessage("")
      }
  };


  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
      if(email !== " "){
          setEmailError(false)
          setEmailErrorMessage("")
      }
  };


  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("")
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const handleLastNameChange = (event) => {
      setLastName(event.target.value);
      if(lastName !== " "){
        setLastNameError(false)
        setLastNameErrorMessage("")
      }
  };


  const [phoneValue, setPhoneValue] = useState("")
  const [errorPhone, setErrorPhone] = useState(false);

  const handlePhoneChange = (event) => {
      setPhoneValue(event)
      if(phoneValue !== " "){
        setErrorPhone(false)
      }
  }; 

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [passwordErrorMessage2, setPasswordErrorMessage2] = useState("")
  const [passwordErrorMessage3, setPasswordErrorMessage3] = useState("")
  const [passwordErrorMessage4, setPasswordErrorMessage4] = useState("")
  const [passwordErrorMessage5, setPasswordErrorMessage5] = useState("")
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if(password !== " "){
          setPasswordError(false)
          setPasswordErrorMessage("")
          setPasswordErrorMessage2("")
          setPasswordErrorMessage3("")
          setPasswordErrorMessage4("")
          setPasswordErrorMessage5("")
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    const passwordValid = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    const phoneValid = isValidPhoneNumber(phoneValue)
    formValidation();
    function formValidation(){
        if(password === "" && passwordValid === false){
            setPasswordError(true)
            event.target.password.focus()
            setPasswordErrorMessage("Field required - please enter a password")
            setPasswordErrorMessage2("Your password must be 8 characters long")
            setPasswordErrorMessage3("Your password must contain a capital & lowercase")
            setPasswordErrorMessage4("Your password must contain a number")
            setPasswordErrorMessage5("Your password must contain a special character")
        }else if(passwordValid === false){
            setPasswordErrorMessage("Please ensure your password has the following:")
            setPasswordErrorMessage2("- Must be 8 characters long")
            setPasswordErrorMessage3("- Must contain a capital & lowercase")
            setPasswordErrorMessage4("- Must contain a number")
            setPasswordErrorMessage5("- Must contain a special character")

        }
        if(email === "" || emailValid === false){
            setEmailError(true)
            event.target.email.focus()
            setEmailErrorMessage("Field required - please enter a valid email address")
        }
        if( phoneValid === false){
            setErrorPhone(true)
        }
        if(lastName === ""){
            setSuccess(false);
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

    if(passwordError === false && emailError === false && errorPhone === false && lastNameError === false && firstNameError === false && emailValid === true && phoneValid === true && passwordValid === true){
        axios
        .post((signUpPageUrl), {
            first_name: firstName,
            last_name: lastName,
            cell_phone: phoneValue,
            email: email,
            password: password
        })
        .then(() => {
          setIsOpenAfterSuccess(!isOpenAfterSuccess);
          setFirstName("")
          setLastName("")
          setPhoneValue("")
          setEmail("")
          setPassword("")
          setTimeout(() => {
            navigateHomePage("/");
          }, 2000);
        })
        .catch((error) => {
            setSuccess(false)
            if(error.response.data.message === "User with that email already exists"){
                setEmailErrorMessage(error.response.data.message)
            }
        });
    }

  }

  const handleCancelClick = () => {
    navigateHomePage("/")
    window.scrollTo(0, 0)
  };

  return (
    <main className="signup-page">
            <form autoComplete="off" onSubmit={handleSubmit} className='sign-up'>
                <h1 className="signup__title">Sign up</h1>
                <label className="sign-up__labels" htmlFor="first_name">First Name:</label>
                <input type="text" placeholder="Please enter your first name" defaultValue={firstName} onChange={handleFirstNameChange} className={firstNameError === true ? 'sign-up__input-error' : 'sign-up__input' }  id="firstName" name="firstName"></input>
                <div className="sign-up__error-message">{firstNameErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="last_name">Last Name:</label>
                <input type="text" placeholder="Please enter your last name" value={lastName} onChange={handleLastNameChange} className={lastNameError === true ? 'sign-up__input-error' : 'sign-up__input' } id="lastName" name="lastName"></input>
                <div className="sign-up__error-message">{lastNameErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="phone">Cell Phone:</label>
                <PhoneInput placeholder="Please enter your cell phone #" className={errorPhone === true ? 'sign-up__input-error' : 'sign-up__input' }
                countryCallingCodeEditable={false} international defaultCountry="CA" value={phoneValue} onChange={handlePhoneChange} id="phone-input"></PhoneInput>
                {errorPhone && <div className="sign-up__error-message">Field required - please provide a valid phone number</div>}

                <label className="sign-up__labels" htmlFor="email">Email:</label>
                <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true ? 'sign-up__input-error' : 'sign-up__input' } id="email" name="email"></input>
                <div className="sign-up__error-message">{emailErrorMessage}</div>

                <label className="sign-up__labels" htmlFor="name">Password:</label>
                <div className="sign-up__show-hide-password-container">
                    <input type={passwordShown ? "text" : "password"} placeholder="Please enter your password" value={password} onChange={handlePasswordChange} className={passwordError === true ? 'sign-up__input-error' : 'sign-up__input' } id="password" name="password"></input>
                    <img src={showOrHidePassword} alt="Show or hide password" className="sign-up__show-password" onClick={togglePassword}/>
                </div>
                <div className="sign-up__password-error-message">{passwordErrorMessage}</div>
                <div className="sign-up__password-error-message">{passwordErrorMessage2}</div>
                <div className="sign-up__password-error-message">{passwordErrorMessage3}</div>
                <div className="sign-up__password-error-message">{passwordErrorMessage4}</div>
                <div className="sign-up__password-error-message">{passwordErrorMessage5}</div>

                <div className="sign-up__button-container">
                    <p className="signup-page__log-in">
                        Have an account? <Link to="/login">Log in</Link>
                    </p>
                    <button type="submit" className="sign-up__button">Sign up</button>
                    <button onClick={handleCancelClick} className="sign-up__button">Cancel</button>
                </div>
                <div>
                    {isOpenAfterSuccess && <PopupNoClose
                        content={<>
                        <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                        <p className="sign-up__registered">Sign up successful!</p>
                    </>}
                    />}
                </div>
            </form>

    </main>
  );
};

export default Signup;