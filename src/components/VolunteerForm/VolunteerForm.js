import './VolunteerForm.scss';

import { useNavigate } from "react-router-dom";

import axios from 'axios';

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import markerIcon from "../../assets/images/icons/MapIcon2.png"

import { useState, useEffect } from 'react';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import Popup from '../PopUp/PopUp.js';

import PopupNoClose from '../PopUp/PopUpNoClose.js';

const USER_REGISTER = process.env.REACT_APP_USER_REGISTER_URL;

const API = process.env.REACT_APP_API_KEY;

const urlForUserRegister =`${USER_REGISTER}${API}`;

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MPAS_API_KEY;
const googleApi = `${GOOGLE_API}`;

const USER_CURRENT = process.env.REACT_APP_USER_CURRENT_URL;

const urlForUserCurrent =`${USER_CURRENT}${API}`;

const VolunteerForm = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }

    const [isOpenAfterSuccess, setIsOpenAfterSuccess] = useState(false);

    const noLoginFormClicked = () => {
        setIsOpen(!isOpen);
    }

    const [user, setUser] = useState({});
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
              setUser(res.data);
              setFailedAuth(false);
            })
            .catch((err) => {
              setFailedAuth(true);
            })
        }

    }, [authToken, failedAuth]);


    const navigateLoginPage = useNavigate();

    const handleLogin = () => {
        navigateLoginPage("/login")
        window.scrollTo(0, 0)
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleApi,
      });

    const [success, setSuccess] = useState(false);

    const navigateHomePage = useNavigate();

    const [nameErrorMessage, setNameErrorMessage] = useState("")

    const [name, setName] = useState("");

    const [nameError, setNameError] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        if(name !== " "){
            setNameError(false)
            setNameErrorMessage("")
        }
    };


    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if(email !== " "){
            setEmailError(false)
            setEmailErrorMessage("")
        }
    };


    const [cityErrorMessage, setCityErrorMessage] = useState("")
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);

    const handleCityChange = (event) => {
        setCity(event.target.value);
        if(city !== " "){
            setCityError(false)
            setCityErrorMessage("")
        }
    };


    const [stateErrorMessage, setStateErrorMessage] = useState("")
    const [state, setState] = useState("");
    const [stateError, setStateError] = useState(false);

    const handleStateChange = (event) => {
        setState(event.target.value);
        if(state !== " "){
            setStateError(false)
            setStateErrorMessage("")
        }
    };



    const [countryErrorMessage, setCountryErrorMessage] = useState("")
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState(false);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        if(country !== " "){
            setCountryError(false)
            setCountryErrorMessage("")
        }
    };


    const [latLongErrorMessage, setLatLongErrorMessage] = useState("")
    const [latValue, setLatValue] = useState(0);
    const [longValue, setLongValue] = useState(0);
    const [latLongError, setLatLongError] = useState(false);


    const [dateErrorMessage, setDateErrorMessage] = useState("")
    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState(false);

    const handleDateChange = (event) => {
        setDate(event.target.value);
        if(dateError !== " "){
            setDateError(false)
            setDateErrorMessage("")
        }
    };

    const [timeErrorMessage, setTimeErrorMessage] = useState("")
    const [time, setTime] = useState("00:00");
    const [timeError, setTimeError] = useState(false);

    const handleTimeChange = (event) => {
        setTime(event.target.value);
        if(time !== "00:00"){
            setTimeError(false)
            setTimeErrorMessage("")
        }
    };


    const handleCancelClick = () => {
        navigateHomePage("/")
        window.scrollTo(0, 0)
      };

      if (!isLoaded){
        return <LoadingScreen/>;
      } 


      const handleSubmitForm = (event) => {
        event.preventDefault()
        const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
        formValidation();
        function formValidation(){
            if(latValue === 0 || longValue === 0){
                setLatLongError(true)
                setLatLongErrorMessage("Please select a spot on the map")
            }
            if(time === "00:00"){
                setTimeError(true)
                event.target.time.focus()
                setTimeErrorMessage("Field required - please enter clean up time")
            }
            if(date === ""){
                setDateError(true)
                event.target.date.focus()
                setDateErrorMessage("Field required - please enter clean up date")
            }
            if(country === ""){
                setCountryError(true)
                event.target.country.focus()
                setCountryErrorMessage("Field required - please enter your country")
            }
            if(state === ""){
                setStateError(true)
                event.target.state.focus()
                setStateErrorMessage("Field required - please enter your state/province")
            }
            if(city === ""){
                setCityError(true)
                event.target.city.focus()
                setCityErrorMessage("Field required - please enter your city")
            }
            if(email === "" || emailValid === false){
                setEmailError(true)
                event.target.email.focus()
                setEmailErrorMessage("Field required - please enter a valid email address")
            }
            if(name === ""){
                setNameError(true)
                event.target.name.focus()
                setNameErrorMessage("Field required - please enter your full name")
            }
        }

        if(latLongError === false && timeError === false && dateError === false && countryError === false && stateError === false && cityError === false & emailError === false && nameError === false && emailValid === true){
            let timeSplit = time.split(':');
            let hours = Number(timeSplit[0]);
            let minutes = Number(timeSplit[1]);
            // calculate
            let timeValue = "";
            if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
            } else if (hours > 12) {
            timeValue= "" + (hours - 12);
            } else if (hours === 0) {
            timeValue= "12";
            }
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

            axios
            .post((urlForUserRegister), {
                name: name,
                email: email,
                city: city,
                state: state,
                country: country,
                date_of_clean_up: date,
                time_of_clean_up: timeValue,
                long_map_value: longValue,
                lat_map_value:  latValue,
                user_id: user.id
            })
            .then(() => {
              setIsOpenAfterSuccess(!isOpenAfterSuccess);
              setName("")
              setEmail("")
              setCity("")
              setState("")
              setCountry("")
              setDate("")
              setTime("00:00")
              setTimeout(() => {
                navigateHomePage("/");
                window.scrollTo(0, 0)
              }, 2000);
            })
            .catch((error) => {
                setSuccess(false)
            });
        }
      };

      if(user.id === undefined){
        return(
            <>
            <div className="volunteer__no-user-logged-everything">
        <div className="volunteer__no-user-logged-container">
            <p className="volunteer__sign-in-please">Please login or create an account to run a clean up</p>
            <img className="volunteer__sign-in-please-logo" src={cleanEarthLogo} alt="Clean Earth Logo"/>
            <button onClick={handleLogin} className="volunteer__login-button">Login/Sign-up</button>
        </div>
                    <form onClick={noLoginFormClicked} onSubmit={handleSubmitForm} className='volunteer'>
                    <div className="volunteer__heading-container">
                        <h1 className="volunteer__heading">Register a clean up with Clean Earth!</h1>
                        <p className="volunteer__text">Thank you for your commitment to making a difference. We are always looking for volunteers to participate in our vision of having a cleaner environment worldwide!</p>
                    </div>
                    <div className="volunteer__form-everything-container">
                        <div className="volunteer__inputs-container">
                            <label className="volunteer__labels" htmlFor="name">Name:</label>
                            <input type="text" placeholder="Please enter your full name" value={name} onChange={handleNameChange} className={nameError === true ? 'volunteer__input-error' : 'volunteer__input' }  id="name" name="name" disabled></input>
                            <div className="volunteer__error-message">{nameErrorMessage}</div>
    
                            <label className="volunteer__labels" htmlFor="name">Email:</label>
                            <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true ? 'volunteer__input-error' : 'volunteer__input' } id="email" name="email" disabled></input>
                            <div className="volunteer__error-message">{emailErrorMessage}</div>
                        </div>
    
                        <div className="volunteer__inputs-container">
                            <label className="volunteer__labels" htmlFor="name">City:</label>
                            <input type="text" placeholder="Please enter your city" value={city} onChange={handleCityChange} className={cityError === true ? 'volunteer__input-error' : 'volunteer__input' } id="city" name="city" disabled></input>
                            <div className="volunteer__error-message">{cityErrorMessage}</div>
    
                            <label className="volunteer__labels" htmlFor="name">State/Province:</label>
                            <input type="text" placeholder="Please enter your state/province" value={state} onChange={handleStateChange} className={stateError === true ? 'volunteer__input-error' : 'volunteer__input' } id="state" name="state" disabled></input>
                            <div className="volunteer__error-message">{stateErrorMessage}</div>
    
                            <label className="volunteer__labels" htmlFor="name">Country:</label>
                            <input type="text" placeholder="Please enter your country" value={country} onChange={handleCountryChange} className={countryError === true ? 'volunteer__input-error' : 'volunteer__input' } id="country" name="country" disabled></input>
                            <div className="volunteer__error-message">{countryErrorMessage}</div>
                        </div>
    
                        <div className="volunteer__inputs-container-time-date">
                            <label className="volunteer__labels" htmlFor="name">Date for clean up:</label>
                            <input min={new Date().toISOString().slice(0, -8).split('T')[0]} type="date" onChange={handleDateChange} className={dateError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="date" name="date" disabled></input>
                            <div className="volunteer__error-message">{dateErrorMessage}</div>
    
                            <label className="volunteer__labels" htmlFor="name">Time for clean up:</label>
                            <input type="time" value={time} onChange={handleTimeChange} className={timeError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="time" name="time" disabled/>
                            <div className="volunteer__error-message">{timeErrorMessage}</div>
                        </div>
                    </div>
    
                    <label className="volunteer__labels" htmlFor="name">Location:</label>
                    <p className="volunteer__text-map">Please select a location on the map (below) for your clean up</p>
                    <div className="volunteer__par-container-above-map">
                        <p className="map-par-mobile">Mobile/tablet: Please use two fingers to zoom in or out on the map below</p>
                        <p className="map-par">Desktop: Please press Ctrl + Scroll to zoom in or out on the map below</p>
                    </div>
                    <p className="volunteer__sign-in-please-map">*Please login or create an account to view the map*</p> 
                    <div className="volunteer__lat-long-error-message-red">{latLongErrorMessage}</div>
    
                    <div className="volunteer__button-container">
                        <button type="submit" className="volunteer__button-no-login" disabled>Submit</button>
                        <button className="volunteer__button-no-login" disabled>Cancel</button>
                    </div>
                    {success && <div className="volunteer__message">Clean up registered!</div>}
                </form>
                </div>
            <div>
            {isOpen && <Popup
                content={<>
                <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                <p className="volunteer__sign-in-please">Please login or create an account to run a clean up</p>
            </>}
            handleClose={togglePopup}
            />}
            </div>
                </>
        )
    }else{
        return (
            <form onSubmit={handleSubmitForm} className='volunteer'>
                <div className="volunteer__heading-container">
                    <h1 className="volunteer__heading">Register a clean up with Clean Earth!</h1>
                    <p className="volunteer__text">Thank you for your commitment to making a difference. We are always looking for volunteers to participate in our vision of having a cleaner environment worldwide!</p>
                </div>
                <div className="volunteer__form-everything-container">
                    <div className="volunteer__inputs-container">
                        <label className="volunteer__labels" htmlFor="name">Name:</label>
                        <input type="text" placeholder="Please enter your full name" value={name} onChange={handleNameChange} className={nameError === true ? 'volunteer__input-error' : 'volunteer__input' }  id="name" name="name"></input>
                        <div className="volunteer__error-message">{nameErrorMessage}</div>

                        <label className="volunteer__labels" htmlFor="name">Email:</label>
                        <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true ? 'volunteer__input-error' : 'volunteer__input' } id="email" name="email"></input>
                        <div className="volunteer__error-message">{emailErrorMessage}</div>
                    </div>

                    <div className="volunteer__inputs-container">
                        <label className="volunteer__labels" htmlFor="name">City:</label>
                        <input type="text" placeholder="Please enter your city" value={city} onChange={handleCityChange} className={cityError === true ? 'volunteer__input-error' : 'volunteer__input' } id="city" name="city"></input>
                        <div className="volunteer__error-message">{cityErrorMessage}</div>

                        <label className="volunteer__labels" htmlFor="name">State/Province:</label>
                        <input type="text" placeholder="Please enter your state/province" value={state} onChange={handleStateChange} className={stateError === true ? 'volunteer__input-error' : 'volunteer__input' } id="state" name="state"></input>
                        <div className="volunteer__error-message">{stateErrorMessage}</div>

                        <label className="volunteer__labels" htmlFor="name">Country:</label>
                        <input type="text" placeholder="Please enter your country" value={country} onChange={handleCountryChange} className={countryError === true ? 'volunteer__input-error' : 'volunteer__input' } id="country" name="country"></input>
                        <div className="volunteer__error-message">{countryErrorMessage}</div>
                    </div>

                    <div className="volunteer__inputs-container-time-date">
                        <label className="volunteer__labels" htmlFor="name">Date for clean up:</label>
                        <input min={new Date().toISOString().slice(0, -8).split('T')[0]} type="date" onChange={handleDateChange} className={dateError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="date" name="date"></input>
                        <div className="volunteer__error-message">{dateErrorMessage}</div>

                        <label className="volunteer__labels" htmlFor="name">Time for clean up:</label>
                        <input type="time" value={time} onChange={handleTimeChange} className={timeError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="time" name="time"/>
                        <div className="volunteer__error-message">{timeErrorMessage}</div>
                    </div>
                </div>

                <label className="volunteer__labels" htmlFor="name">Location:</label>
                <p className="volunteer__text-map">Please select a location on the map (below) for your clean up</p>
                <div className="volunteer__par-container-above-map">
                    <p className="map-par-mobile">Mobile/tablet: Please use two fingers to zoom in or out on the map below</p>
                    <p className="map-par">Desktop: Please press Ctrl + Scroll to zoom in or out on the map below</p>
                </div>
                <Map setLatLongErrorMessage={setLatLongErrorMessage} setLatLongError={setLatLongError} setLat={setLatValue} setLong={setLongValue}/> 
                <div className="volunteer__lat-long-error-message-red">{latLongErrorMessage}</div>

                <div className="volunteer__button-container">
                    <button type="submit" className="volunteer__button">Submit</button>
                    <button onClick={handleCancelClick} className="volunteer__button">Cancel</button>
                </div>
                <div>
                    {isOpenAfterSuccess && <PopupNoClose
                        content={<>
                        <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                        <p className="volunteer__registered">Clean up registered!</p>
                    </>}
                    />}
                </div>
            </form>
    );
    }
};


function Map({setLatLongErrorMessage, setLatLongError, setLat, setLong}) {

    const[mapIcon] = useState(markerIcon);

    const[position, setPosition] = useState({ lat: "", lng: ""})
  
    const [center] = useState({ lat: 48.1667, lng: -100.1667 })
  
    const[zoom] = useState(3.7)

    const handleClickMap = event => { const lat = event.latLng.lat(); const lng = event.latLng.lng(); setLat(lat); setLong(lng); setPosition({ lat: lat, lng: lng}); setLatLongErrorMessage(""); setLatLongError(false)};
    return (
      <GoogleMap  zoom={zoom} center={center} mapContainerClassName="map-container" onClick={(event) => {handleClickMap(event)}} >
        <MarkerF
          position={position}
          icon = {mapIcon}
        /></GoogleMap>
    );
  }
export default VolunteerForm;