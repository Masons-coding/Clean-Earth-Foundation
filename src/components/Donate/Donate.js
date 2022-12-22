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

    const[hiddenDivClass, setHiddenDivClass] = useState("donate__hidden-div")

    const[hiddenDivText, setHiddenDivText] = useState("")

    const tenClicked = () => {
        setIsOpen(!isOpen);
        setHiddenDivClass("donate__hiden-div")
        setHiddenDivText("")
        setMoneyValue("$10/month donation");
    }

    const twentyClicked = () => {
        setIsOpen(!isOpen);
        setHiddenDivClass("donate__hiden-div")
        setHiddenDivText("")
        setMoneyValue("$20/month donation");
    }

    const oneTimeClicked = () => {
        setIsOpen(!isOpen);
        setHiddenDivClass("donate__hiden-div")
        setHiddenDivText("")
        setMoneyValue("$Custom one time donation");
    }

    const submitClick = () => {
        if(moneyValue === 0){
            setHiddenDivClass("donate__hidden-div-show")
            setHiddenDivText("Please select a value to donate first")
        }
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
                    <div className="donate__options-container">
                        <div>
                            <p className="donate__options-text">Please select an Option:</p>
                            <div className={hiddenDivClass}>{hiddenDivText}</div>
                        </div>
                        <div className="donate__button-container"> 
                            <button onClick={tenClicked} className="donate__button">$10/month</button>
                            <button onClick={twentyClicked} className="donate__button">$20/month</button>
                            <button onClick={oneTimeClicked} className="donate__button-one-time">Custom (one time)</button>
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
                <a onClick={submitClick} href={moneyValue === "$10/month donation"? "https://buy.stripe.com/7sIbM7c2538d6KQaEE" : moneyValue==="$20/month donation"? "https://buy.stripe.com/cN22bx0jnfUZ7OU001" : moneyValue==="$Custom one time donation"? "https://buy.stripe.com/6oE17t7LP5gl8SY4gi" : null} className="donate__submit-button">Continue to payment</a>
            </>}
            handleClose={togglePopup}
            />}
            </div>

        </div>


        </>
    );
};

export default Donate;