import './Header.scss';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";
import emailIcon from "../../assets/images/icons/EmailIcon.svg";
import phoneIcon from "../../assets/images/icons/PhoneIcon.svg";

import { NavLink, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { slide as Menu } from 'react-burger-menu'

const USER_CURRENT = process.env.REACT_APP_USER_CURRENT_URL;

const API = process.env.REACT_APP_API_KEY;

const urlForUserCurrent =`${USER_CURRENT}${API}`;

const Header = () => {
    const [user, setUser] = useState({});
    const [failedAuth, setFailedAuth] = useState(true);
  
    const authToken = sessionStorage.getItem('authToken');
  
    // if there is an error from the endpoint (ie: token invalid, expired, tampered with)
    useEffect(() => {
        if (!authToken){
            setFailedAuth(true);
        }else{
            axios
            .get((urlForUserCurrent), {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then((res) => {
              setUser(res.data);
              setFailedAuth(false);
            })
            .catch((err) => {
              setFailedAuth(true);
            })
        }

    }, [authToken, failedAuth]);

    const {first_name} = user;

    const navigateHomePage = useNavigate();
    const navigateLoginPage = useNavigate();

    const handleLogoClick = () => {
        navigateHomePage("/")
        window.scrollTo(0, 0)
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        window.location.reload()
    }

    const handleLogin = () => {
        navigateLoginPage("/login")
        window.scrollTo(0, 0)
    }
    
    return (
        <header className="header">
            <div className="header__clean-earth-logo-container">
                <button className="header__logo-button" onClick={handleLogoClick}><img  className="header__clean-earth-logo" src={cleanEarthLogo} alt="CleanEarth Logo"/></button>
            </div>
            <div className="header__contact-links-container">
                <div className="header__contact-container">
                    <div className="header__contact-content-container">
                        <div className="header__icon-div">
                            <img className="header__email-icon" src={emailIcon} alt="Email Icon" />
                            <a href="mailto:contact@cleanearthfoundation.com" className="header__email-button">contact@cleanearthfoundation.com</a>
                        </div>
                        <div className="header__icon-div">
                            <img className="header__phone-icon" src={phoneIcon} alt="Phone Icon" />
                            <button className="header__phone-button">1-905-980-1165</button>
                        </div>
                    </div>
                    <div className="header__contact-content-container2">
                        <a href="https://www.instagram.com/becleanearth/"><img className="header__instagram-logo" src={instagramLogo} alt="Instagram logo"/></a>
                        <a href="https://www.facebook.com/BeCleanEarth/"><img className="header__facebook-logo" src={facebookLogo} alt="Facebook logo"/></a>
                        <a href="https://www.twitter.com/BeCleanEarth/"><img className="header__twitter-logo" src={twitterLogo} alt="Twitter logo"/></a>
                    </div>
                    <div className="header__login-sign-up">
                        <button onClick={handleLogin} className={first_name === undefined ? "header__login-button" : "header__login-button-hidden" }>Login/Sign-up</button>
                    </div>
                    <div>
                        <p className={first_name === undefined ? 'header__hide-welcome'  : 'header__show-welcome' }>{`Welcome to Clean Earth ${first_name}!`}</p>
                        <button onClick={handleLogout} className={first_name === undefined ? "header__logout-button-hidden" : "header__logout-button" }>Log out</button>
                    </div>
                </div>
                <div className="header__nav-links">
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/">Home</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/volunteer">Lead a clean up</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/about">About</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/gallery">Gallery</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/initiative">Initiatives</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/products">Products</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/donate">Donate</NavLink>
                </div>
                <Menu>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/">Home</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/volunteer">Lead a clean up</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/about">About</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/gallery">Gallery</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/initiative">Initiatives</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/products">Products</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/donate">Donate</NavLink>
                </Menu>
            </div>
        </header>
    );
};

export default Header;
