import "./Hero.scss"

import { useNavigate  } from 'react-router-dom';

import leadCleanUpIcon from "../../assets/images/icons/LeadCleanUpIcon.svg";
import joinCleanUpIcon from "../../assets/images/icons/JoinCleanUpIcon.svg";

import { useState, useEffect } from 'react';
import axios from 'axios';

const USER_CURRENT = process.env.REACT_APP_USER_CURRENT_URL;

const API = process.env.REACT_APP_API_KEY;

const urlForUserCurrent =`${USER_CURRENT}${API}`;
  
const Hero = () => {

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
            setFailedAuth(false);
          })
          .catch((err) => {
            setFailedAuth(true);
          })
      }

  }, [authToken]);

  const navigateVolunteerPage = useNavigate();

  const handleLeadClick = () => {
      navigateVolunteerPage("/volunteer")
      window.scrollTo(0, 0)
  };

  const handleJoinClick = () => {
    window.scrollTo(0, 900);
};

  return (
    <section className="hero">
      <div className="hero__text-button-container">
        <h1 className="hero__title">WELCOME TO CLEAN EARTH</h1>
        <p className="hero__text">Register to become a volunteer with Clean Earth and we will notify you if there are cleanup events going on in your region or help you run your own event!</p>
          <div className="hero__lead-join-container">
            <div onClick={handleLeadClick} className="hero__lead-container">
              <img src={leadCleanUpIcon} alt="Map and pencil"/>
              <button className="hero__button-lead">Lead a clean up!</button>
            </div>
            <div onClick={handleJoinClick} className={failedAuth === true ? "hero__join-container-hidden" : "hero__join-container" }>
              <img src={joinCleanUpIcon} alt="Map with place marker"/>
              <button className="hero__button-join" >Join a clean up!</button>
            </div>
          </div>
        </div>
    </section>
  )
}
export default Hero;