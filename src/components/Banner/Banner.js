import './Banner.scss';

import { useNavigate  } from 'react-router-dom';
import rightArrowIcon from "../../assets/images/icons/RightArrowIcon.png";

const Banner = () => {

    const navigateDonatePage = useNavigate();

    const handleDonateClick = () => {
        navigateDonatePage("/donate")
        window.scrollTo(0, 0)
    };
    return (
        <div className="banner">
            <p className="banner__help-par">Help support our cause by donating or volunteering!</p>
            <div className="banner__icon-div">
                <button onClick={handleDonateClick} className="banner__button">Click here to Donate!</button>
                <img className="header__phone-icon" src={rightArrowIcon} alt="Right arrow" />
            </div>
        </div>
    );
};

export default Banner;