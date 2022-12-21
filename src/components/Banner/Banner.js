import './Banner.scss';

import { useNavigate  } from 'react-router-dom';
import donateIcon from "../../assets/images/icons/DonateIcon.png";

const Banner = () => {

    const navigateDonatePage = useNavigate();

    const handleDonateClick = () => {
        navigateDonatePage("/donate")
        window.scrollTo(0, 500);
    };
    return (
        <div className="banner">
            <p className="banner__help-par">Help support our cause by donating or volunteering!</p>
            <div onClick={handleDonateClick} className="banner__icon-container">
                <button className="banner__button">Click here to Donate!</button>
                <img className="banner__donate-icon" src={donateIcon} alt="Hand holding the world" />
            </div>
        </div>
    );
};

export default Banner;