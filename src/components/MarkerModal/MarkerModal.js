import "./MarkerModal.scss"
import { useEffect, useState } from "react";
import axios from "axios";

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import CancelIcon from "../../assets/images/icons/CancelIcon.svg";

import Geocode from "react-geocode";

import Popup from '../../components/PopUp/PopUp.js';

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import MyCleanUpsIcon from "../../assets/images/icons/MyCleanUpsIcon.png";

import { useNavigate } from 'react-router-dom';

const MARKER_MODAL = process.env.REACT_APP_MARKER_MODAL_URL;

const API = process.env.REACT_APP_API_KEY;

const markerModalUrl =`${MARKER_MODAL}`;

const api = `${API}`

const GEO_CODE = process.env.REACT_APP_GOOGLE_GEO_CODE_KEY;
const geoCode = `${GEO_CODE}`;

const JOIN_CLEAN_UP = process.env.REACT_APP_JOIN_URL;

const urlForJoinCleanUp =`${JOIN_CLEAN_UP}${API}`;

const USER_CURRENT = process.env.REACT_APP_USER_CURRENT_URL;

const urlForUserCurrent =`${USER_CURRENT}${API}`;

export default function MarkerModal({ setOpenModal, cleanupId, userId, setZoom }) {

  const [user, setUser] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
      setIsOpen(!isOpen);
    }

  const [isOpenAfterJoin, setIsOpenAfterJoin] = useState(false);

  const togglePopupIsOpenAfterJoin = () => {
      setIsOpenAfterJoin(!isOpenAfterJoin);
    }

    const [isOpenAlreadyJoined, setIsOpenAlreadyJoined] = useState(false);

    const togglePopupIsOpenAlreadyJoined = () => {
        setIsOpenAlreadyJoined(!isOpenAlreadyJoined);
      }

    const [isOpenOwnCleanUp, setIsOpenOwnCleanUp] = useState(false);

    const togglePopupIsOpenOwnCleanUp = () => {
        setIsOpenOwnCleanUp(!isOpenOwnCleanUp);
      }

  const joinClicked = () => {
      if(user.id === userId){
        setIsOpenOwnCleanUp(!isOpenOwnCleanUp);
      }else{
        setIsOpen(!isOpen);
      }

  }

  const [joinDesktopClass, setJoinDesktopClass] = useState("marker-modal__join-button-container")
  const[joinTabletMobileClass, setJoinTabletMobileClass] = useState("marker-modal__button-mobile-tablet")

  const [failedAuth, setFailedAuth] = useState(true);

  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken){
      setJoinDesktopClass("marker-modal__join-button-container-hidden")
      setJoinTabletMobileClass("marker-modal__join-button-container-mobile-tablet-hidden")
      setFailedAuth(true);
    }else{
      setJoinDesktopClass("marker-modal__join-button-container")
      setJoinTabletMobileClass("marker-modal__join-button-container-mobile-tablet")
    }

}, [authToken]);

  Geocode.setApiKey(geoCode);

  function geoCodeAddress(lat, long){
    Geocode.fromLatLng(lat, long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address)
        setAddressDataFound(true)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function dateFunction(date){
    return date.slice(0,10);
  }

  const [cleanUp, setCleanUp] = useState(null);
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState(null);

  let [addressDataFound, setAddressDataFound] = useState(false);

  useEffect(() => {
    axios.get(`${markerModalUrl}${cleanupId}${api}`).then((response) => {
      setCleanUp(response.data);
      setDate(dateFunction(response.data.date_of_clean_up));
      geoCodeAddress(response.data.lat_map_value, response.data.long_map_value);
    });
  },[cleanupId]);

  useEffect(() => {
    axios
    .get((urlForUserCurrent), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
}, [authToken]);

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  };
  
  const data ={
    clean_up_id: cleanupId
  }

  const joinConfirmClicked = () => {
    if(user.clean_up_id === cleanupId){
      setIsOpen(!isOpen);
      setIsOpenAlreadyJoined(!isOpenAlreadyJoined);
    }else{
      axios
      .post(urlForJoinCleanUp, data, config)
      .catch((err) => {
        console.log(err);
      })
      setIsOpen(!isOpen);
      setIsOpenAfterJoin(!isOpenAfterJoin)
    }
  };

  const navigateCleanUpsPage = useNavigate();

  const handleMyCleanUps = () => {
    navigateCleanUpsPage("/cleanups")
    window.scrollTo(0, 500);
  };

  const handleMyCleanUpsOwn = () => {
    navigateCleanUpsPage("/cleanups")
    window.scrollTo(0, 0);
  };

  if (!cleanUp || addressDataFound === false) return <LoadingScreen/>;
  
  return (
    <>
    <div className="marker-modal">

        <div className="marker-modal-images-container">
            <img className="clean-earth-logo" src={cleanEarthLogo} alt="CleanEarth Logo"/>
            <img
                src={CancelIcon}
                className="marker-modal__close"
                alt="close icon"
                onClick={() => {
                setAddressDataFound(false);
                setOpenModal(false);
                setZoom(3.7)
                }}
            
            />
        </div>
            <div className="everything-container">

                <div className="headers-container">
                    <h2 className="header-text">Clean up ran by:</h2>
                    <h2 className="header-text">Clean up city:</h2>
                    <h2 className="header-text">Clean up state:</h2>
                    <h2 className="header-text">Clean up country:</h2>
                    <h2 className="header-text">Clean up date:</h2>
                    <h2 className="header-text">Clean up time:</h2>
                    <h2 className="header-text">Clean up location:</h2>
                </div>


                <div className="par-container">
                    <p className="par">{cleanUp.name}</p>
                    <p className="par">{cleanUp.city}</p>
                    <p className="par">{cleanUp.state}</p>
                    <p className="par">{cleanUp.country}</p>
                    <p className="par">{date}</p>
                    <p className="par">{cleanUp.time_of_clean_up}</p>
                    <p className="par">{address}</p>
                </div>

                <div className={joinDesktopClass}>
                  <button onClick={joinClicked} className="marker-modal__button">Join!</button>
                </div>

            </div>

            <div className="everything-container-mobile-tablet">
              <h2 className="header-text-mobile">Clean up ran by:</h2>
              <p className="par-mobile">{cleanUp.name}</p>
              <h2 className="header-text-mobile">Clean up city:</h2>
              <p className="par-mobile">{cleanUp.city}</p>
              <h2 className="header-text-mobile">Clean up state:</h2>
              <p className="par-mobile">{cleanUp.state}</p>
              <h2 className="header-text-mobile">Clean up country:</h2>
              <p className="par-mobile">{cleanUp.country}</p>
              <h2 className="header-text-mobile">Clean up date:</h2>
              <p className="par-mobile">{date}</p>
              <h2 className="header-text-mobile">Clean up location:</h2>
              <p className="par-mobile">{address}</p>
              <div className={joinTabletMobileClass}>
                <button onClick={joinClicked} className="marker-modal__button-mobile-tablet">Join!</button>
              </div>
            </div>

    </div>

    <div>
    {isOpen && <Popup
        content={<>
        <img className="marker-modal__logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
        <h1 className="marker-modal__pop-up-header">Do you wish to join this clean up?</h1>
        <div className="marker-modal__pop-up-button-container">
            <button onClick={joinConfirmClicked} className="marker-modal__pop-up-button">Join!</button>
        </div>
    </>}
    handleClose={togglePopup}
    />}
    </div>

    <div>
    {isOpenAfterJoin && <Popup
        content={<>
        <img className="marker-modal__logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
        <h1 className="marker-modal__pop-up-header">Added to the clean up!</h1>
        <div onClick={handleMyCleanUps} className="marker-modal__icon-div-cleanups">
          <button onClick={handleMyCleanUps} className="marker-modal__clean-ups-button">My Clean Ups</button>
          <img onClick={handleMyCleanUps} className="marker-modal__button-icon" src={MyCleanUpsIcon} alt="Large tree"></img>
        </div>
    </>}
    handleClose={togglePopupIsOpenAfterJoin}
    />}
    </div>

    <div>
    {isOpenAlreadyJoined && <Popup
        content={<>
        <img className="marker-modal__logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
        <h1 className="marker-modal__pop-up-header">You have already joined this clean up!</h1>
        <div onClick={handleMyCleanUps} className="marker-modal__icon-div-cleanups">
          <button onClick={handleMyCleanUps} className="marker-modal__clean-ups-button">My Clean Ups</button>
          <img onClick={handleMyCleanUps} className="marker-modal__button-icon" src={MyCleanUpsIcon} alt="Large tree"></img>
        </div>
    </>}
    handleClose={togglePopupIsOpenAlreadyJoined}
    />}
    </div>

    <div>
    {isOpenOwnCleanUp && <Popup
        content={<>
        <img className="marker-modal__logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
        <h1 className="marker-modal__pop-up-header">You can't join your own clean up!</h1>
        <div onClick={handleMyCleanUpsOwn} className="marker-modal__icon-div-cleanups">
          <button onClick={handleMyCleanUpsOwn} className="marker-modal__clean-ups-button">My Clean Ups</button>
          <img onClick={handleMyCleanUpsOwn} className="marker-modal__button-icon" src={MyCleanUpsIcon} alt="Large tree"></img>
        </div>
    </>}
    handleClose={togglePopupIsOpenOwnCleanUp}
    />}
    </div>
</>
  );
}
