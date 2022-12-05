import './Header.scss';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";
import emailIcon from "../../assets/images/icons/EmailIcon.png";
import phoneIcon from "../../assets/images/icons/PhoneIcon.png";

import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigateHomePage = useNavigate();

    const handleLogoClick = () => {
        navigateHomePage("/")
        window.scrollTo(0, 0)
    };
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
                            <button className="header__email-button">contact@cleanearthfoundation.com</button>
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
                        <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/login">Login/Sign-up</NavLink>
                    </div>
                </div>
                <div className="header__nav-links">
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/">Home</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/volunteer">Volunteer</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/about">About</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/gallery">Gallery</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/initiative">Initiatives</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/products">Products</NavLink>
                    <NavLink style={({ isActive }) => (isActive ? {color: '#E0E2DB'} : {color: '#fffefe'})} to="/donate">Donate</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
