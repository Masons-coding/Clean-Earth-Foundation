import './Footer.scss';

import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">© copyright 2017-2022 by <b>Clean Earth Foundation</b>. All rights reserved.</p>
            <div className="footer__social">
                <a href="https://www.instagram.com/becleanearth/"><img className="footer__instagram-logo" src={instagramLogo} alt="Instagram logo"/></a>
                <a href="https://www.facebook.com/BeCleanEarth/"><img className="footer__facebook-logo" src={facebookLogo} alt="Facebook logo"/></a>
                <a href="https://www.twitter.com/BeCleanEarth/"><img className="footer__twitter-logo" src={twitterLogo} alt="Twitter logo"/></a>
            </div>
        </footer>
    );
};

export default Footer;