import './Donate.scss';

import rightArrowIcon from "../../assets/images/icons/RightArrowIcon.png";
import thankYouIcon from "../../assets/images/icons/ThankYouIocn.svg";

import donatePicture1 from "../../assets/images/DonatePicture1.jpg";
import donatePicture2 from "../../assets/images/DonatePicture2.jpg";
import donatePicture3 from "../../assets/images/DonatePicture3.jpg";

const Donate = () => {
    window.scrollTo(0, 500);
    return (
        <>
        <div className="donate">
            <h1 className="donate__title">Building a Better Earth One Cause at a Time</h1>
            <p className="donate__text">Help keep our planet clean for future generations! Donate now to Clean Earth to help fund our Clean Oceans and Clean Trails initiatives to make a difference and help save our environment.</p>
            <p className="donate__text">Your donations will help organize and run cleanups, develop strategies to deter plastic pollution from entering the ocean, and help create new recycling programs to help turn plastic pollution into something useful.</p>
            <p className="donate__text">We will use your donations as effectively and transparently as we can to create actual change and give updates on our projects through our social media!</p>
            <p className="donate__text">We appreciate your support, we could not do this without you!</p>
            <p className="donate__cra">1968910 Not for Profit Corporation Number per CRA</p>
            <div className="donate__container">
            <div className="donate__picture-container">
                    <img className="donate__picture" src={donatePicture2} alt="Waterfall"/>
                    <img className="donate__picture" src={donatePicture1} alt="Dolphins"/>
                    <img className="donate__picture" src={donatePicture3} alt="Nature trail"/>
                </div>
                <div className="donate__arrow-container">
                    <button className="donate__button">Click here to Donate!</button>
                    <img className="donate__phone-icon" src={rightArrowIcon} alt="Right arrow" />
                    <img className="donate__phone-icon" src={rightArrowIcon} alt="Right arrow" />
                    <img className="donate__phone-icon" src={rightArrowIcon} alt="Right arrow" />
                </div>
                <div className="donate__links-container">
                    <a className="donate__link" href="https://buy.stripe.com/7sIbM7c2538d6KQaEE">$10/month</a>
                    <a className="donate__link" href="https://buy.stripe.com/cN22bx0jnfUZ7OU001">$20/month</a>
                </div>
            </div>
            <img className="donate__thank-you"src={thankYouIcon} alt="Thank you!"/>
        </div>


        </>
    );
};

export default Donate;