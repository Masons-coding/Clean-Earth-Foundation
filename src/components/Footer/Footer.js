import './Footer.scss';

import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";

import emailIcon from "../../assets/images/icons/EmailIcon.svg";
import phoneIcon from "../../assets/images/icons/PhoneIcon.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__everything-container">
                <div className="footer__container">
                    <p className="footer__text">© Copyright 2017-2024 by <b>Clean Earth Foundation</b>. All rights reserved.</p>
                    <div className="footer__social">
                        <a href="https://www.instagram.com/becleanearth/"><img className="footer__instagram-logo" src={instagramLogo} alt="Instagram logo"/></a>
                        <a href="https://www.facebook.com/BeCleanEarth/"><img className="footer__facebook-logo" src={facebookLogo} alt="Facebook logo"/></a>
                        <a href="https://www.twitter.com/BeCleanEarth/"><img className="footer__twitter-logo" src={twitterLogo} alt="Twitter logo"/></a>
                    </div>
                </div>
                <div className="footer__container">
                    <div className="footer__icon-div">
                        <img className="footer__email-icon" src={emailIcon} alt="Email Icon" />
                        <a href="mailto:contact@cleanearthfoundation.com" className="footer__email-button">contact@cleanearthfoundation.com</a>
                    </div>
                    <div className="footer__icon-div">
                        <img className="footer__phone-icon" src={phoneIcon} alt="Phone Icon" />
                        <button className="footer__phone-button">1-905-980-1165</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;