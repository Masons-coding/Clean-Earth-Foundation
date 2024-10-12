import './Header.scss';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";

import LogoutIcon from "../../assets/images/icons/LogoutIcon.svg";
import LoginIcon from "../../assets/images/icons/LoginIcon.svg";

import MyCleanUpsIcon from "../../assets/images/icons/MyCleanUpsIcon.png";


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
    const navigateCleanUpsPage = useNavigate();

    const handleLogoClick = () => {
        navigateHomePage("/")
        window.scrollTo(0, 0)
    };

    const handleMyCleanUps = () => {
        navigateCleanUpsPage("/cleanups")
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
                    <div className={first_name === undefined ? "header__buttons-container-hidden" : "header__buttons-container"}>
                        <div onClick={handleMyCleanUps} className="header__icon-div-cleanups">
                            <button onClick={handleMyCleanUps} className="header__clean-ups-button">My Clean Ups</button>
                            <img onClick={handleMyCleanUps} className="header__button-icon" src={MyCleanUpsIcon} alt="Large tree"></img>
                        </div>
                        <div onClick={handleLogout} className="header__icon-div-logout">
                            <button onClick={handleLogout} className="header__logout-button">Log out</button>
                            <img onClick={handleLogout} className="header__button-icon" src={LogoutIcon} alt="Logout button"></img>
                        </div>
                    </div>
                    <div className="header__contact-content-container">
                        <a href="https://www.instagram.com/becleanearth/"><img className="header__instagram-logo" src={instagramLogo} alt="Instagram logo"/></a>
                        <a href="https://www.facebook.com/BeCleanEarth/"><img className="header__facebook-logo" src={facebookLogo} alt="Facebook logo"/></a>
                        <a href="https://www.twitter.com/BeCleanEarth/"><img className="header__twitter-logo" src={twitterLogo} alt="Twitter logo"/></a>
                    </div>
                    <p className="coming-soon-text">*COMING SOON*</p>
                    <div className={first_name === undefined ? "header__login-sign-up" : "header__login-sign-up-hidden"}>
                        <div onClick={handleLogin} className="header__icon-div-login">
                            <button onClick={handleLogin} className="header__login-button">Login/Sign-up</button>
                            <img onClick={handleLogin} className="header__button-icon" src={LoginIcon} alt="Login button"></img>
                        </div>
                        <p className={first_name === undefined ? "header__create-an-account" : "header__create-an-account-hidden" }>Create an account/login to join/create a clean up!</p>
                    </div>
                    <div>
                        <p className={first_name === undefined ? 'header__hide-welcome'  : 'header__show-welcome' }>{`Welcome to Clean Earth ${first_name}!`}</p>
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
