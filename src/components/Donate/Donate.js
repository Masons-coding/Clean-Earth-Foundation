import './Donate.scss';

import Popup from '../PopUp/PopUp.js';

import donatePicture1 from "../../assets/images/DonatePicture1.jpg";
import donatePicture2 from "../../assets/images/DonatePicture2.jpg";
import donatePicture3 from "../../assets/images/DonatePicture3.jpg";

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import { useState } from 'react';

const Donate = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }

    const[moneyValue, setMoneyValue] = useState("");

    if(moneyValue === 0 ){
        window.scrollTo(0, 500);
    }

    const tenClicked = () => {
        setIsOpen(!isOpen);
        setMoneyValue("$10 donation (USD)");
    }

    const twentyClicked = () => {
        setIsOpen(!isOpen);
        setMoneyValue("$20 donation (USD)");
    }

    const fiftyClicked = () => {
        setIsOpen(!isOpen);
        setMoneyValue("$50 donation (USD)");
    }

    const twentyMonthClicked = () => {
        setIsOpen(!isOpen);
        setMoneyValue("$20/month donation (USD)");
    }

    const oneTimeClicked = () => {
        setIsOpen(!isOpen);
        setMoneyValue("Custom donation (USD)");
    }

    const submitClick = () => {
    }

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
                <div className="donate__everything-container">
                        <div>
                            <p className="donate__options-text">Please select an Option:</p>
                            <p className="donate__options-text-payment">(Payment in USD)</p>
                        </div>
                        <div className="donate__donation-options-container">
                            <div className="donate__button-container"> 
                                <button onClick={tenClicked} className="donate__button">$10</button>
                                <button onClick={twentyClicked} className="donate__button">$20</button>
                                <button onClick={fiftyClicked} className="donate__button">$50</button>
                                <button onClick={oneTimeClicked} className="donate__button-one-time">Custom</button>
                            </div>
                            <div className="donate__month-container">
                                <button onClick={twentyMonthClicked} className="donate__button-monthly">$20/Month</button>
                            </div>
                        </div>
                </div>
            </div>
            <div>
            {isOpen && <Popup
                content={<>
                <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                <h1 className="donate__pop-up-header">Confirm your donation</h1>
                <p className="donate__pop-up-donate-value">{moneyValue}</p>
                <a onClick={submitClick} href={moneyValue === "$10 donation (USD)"? "https://buy.stripe.com/6oE5nJeaddMR0mscMR" : moneyValue==="$20 donation (USD)"? "https://buy.stripe.com/4gw17t1nr4ch5GM7sy" : moneyValue==="Custom donation (USD)"? "https://buy.stripe.com/6oEeYj5DH9wB3yEfZ1" : moneyValue==="$50 donation (USD)"? "https://buy.stripe.com/00g2bx6HL7otc5a9AH" : moneyValue==="$20/month donation (USD)"? "https://buy.stripe.com/cN22bx0jnfUZ7OU001" : null} className="donate__submit-button">Continue to payment</a>
            </>}
            handleClose={togglePopup}
            />}
            </div>

        </div>


        </>
    );
};

export default Donate;