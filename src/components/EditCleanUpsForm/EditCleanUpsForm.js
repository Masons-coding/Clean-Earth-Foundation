import { useNavigate } from "react-router-dom";

import axios from 'axios';

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import markerIcon from "../../assets/images/icons/MapIcon2.png"

import { useState, useEffect } from 'react';

import PopupNoClose from '../PopUp/PopUpNoClose.js';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MPAS_API_KEY;
const googleApi = `${GOOGLE_API}`;

const EDIT_CLEAN_UP = process.env.REACT_APP_EDIT_URL;

const API = process.env.REACT_APP_API_KEY;

const EditCleanUpsForm = ({cleanUpsToDisplay}) => {

    const [isOpenAfterSuccess, setIsOpenAfterSuccess] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleApi,
      });

    let namefromData = cleanUpsToDisplay.name;
    let emailromData = cleanUpsToDisplay.email;
    let date_of_clean_up = cleanUpsToDisplay.date_of_clean_up;
    let time_of_clean_up = cleanUpsToDisplay.time_of_clean_up;
    let cityFromData = cleanUpsToDisplay.city;
    let stateFromData = cleanUpsToDisplay.state;
    let countryFromData = cleanUpsToDisplay.country;
    let lat_map_value = cleanUpsToDisplay.lat_map_value;
    let long_map_value = cleanUpsToDisplay.long_map_value;

    const [success, setSuccess] = useState(false);

    const [nameErrorMessage, setNameErrorMessage] = useState("")

    const [name, setName] = useState(namefromData);

    const [nameError, setNameError] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        if(name !== " "){
            setNameError(false)
            setNameErrorMessage("")
        }
    };


    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [email, setEmail] = useState(emailromData);
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if(email !== " "){
            setEmailError(false)
            setEmailErrorMessage("")
        }
    };


    const [cityErrorMessage, setCityErrorMessage] = useState("")
    const [city, setCity] = useState(cityFromData);
    const [cityError, setCityError] = useState(false);

    const handleCityChange = (event) => {
        setCity(event.target.value);
        if(city !== " "){
            setCityError(false)
            setCityErrorMessage("")
        }
    };


    const [stateErrorMessage, setStateErrorMessage] = useState("")
    const [state, setState] = useState(stateFromData);
    const [stateError, setStateError] = useState(false);

    const handleStateChange = (event) => {
        setState(event.target.value);
        if(state !== " "){
            setStateError(false)
            setStateErrorMessage("")
        }
    };



    const [countryErrorMessage, setCountryErrorMessage] = useState("")
    const [country, setCountry] = useState(countryFromData);
    const [countryError, setCountryError] = useState(false);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        if(country !== " "){
            setCountryError(false)
            setCountryErrorMessage("")
        }
    };


    const [latLongErrorMessage, setLatLongErrorMessage] = useState("")
    const [latValue, setLatValue] = useState(lat_map_value);
    const [longValue, setLongValue] = useState(long_map_value);
    const [latLongError, setLatLongError] = useState(false);


    const [dateErrorMessage, setDateErrorMessage] = useState("")
    const [date, setDate] = useState(date_of_clean_up.slice(0,10));
    const [dateError, setDateError] = useState(false);

    const handleDateChange = (event) => {
        setDate(event.target.value);
        if(dateError !== " "){
            setDateError(false)
            setDateErrorMessage("")
        }
    };

    const [timeErrorMessage, setTimeErrorMessage] = useState("")
    const [time, setTime] = useState(time_of_clean_up);
    const [timeError, setTimeError] = useState(false);

    const handleTimeChange = (event) => {
        setTime(event.target.value);
        if(time !== "00:00"){
            setTimeError(false)
            setTimeErrorMessage("")
        }
    };

    const navigateCleanUpsPage = useNavigate();

    const handleCancelClick = () => {
        navigateCleanUpsPage("/cleanups")
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
            function getTimeValue(){
                if(time === time_of_clean_up){
                    return time;
                }
                else if(time.length === 9){
                    setTime(time.slice(0,4))
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
                    return timeValue;
                }
                else{
                    setTime(time.slice(0,5))
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
                    setTime(timeValue)
                    return timeValue;
                }
            }

            axios
            .put((`${EDIT_CLEAN_UP}/${cleanUpsToDisplay.id}${API}`), {
                name: name,
                email: email,
                city: city,
                state: state,
                country: country,
                date_of_clean_up: date,
                time_of_clean_up: getTimeValue(),
                long_map_value: longValue,
                lat_map_value:  latValue,
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
                navigateCleanUpsPage("/cleanups");
                window.scrollTo(0, 0)
              }, 2000);
            })
            .catch((error) => {
                setSuccess(false)
            });
      };
    }

    return (
<form onSubmit={handleSubmitForm} className='volunteer'>
                <div className="volunteer__heading-container">
                    <h1 className="volunteer__heading">Edit clean up</h1>
                    <p className="volunteer__text">All changes made will be updated</p>
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
                        <input min={date} value={date} type="date" onChange={handleDateChange} className={dateError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="date" name="date"></input>
                        <div className="volunteer__error-message">{dateErrorMessage}</div>

                        <label className="volunteer__labels" htmlFor="name">Time for clean up:</label>
                        <input type="time" value={time.length === 9? `0${time.slice(0,4)}` : `${time.slice(0,5)}`} onChange={handleTimeChange} className={timeError === true ? 'volunteer__input-error-time-date' : 'volunteer__input-time-date' } id="time" name="time"/>
                        <div className="volunteer__error-message">{timeErrorMessage}</div>
                    </div>
                </div>

                <label className="volunteer__labels" htmlFor="name">Location:</label>
                <p className="volunteer__text-map">Please select a location on the map (below) for your clean up</p>
                <div className="volunteer__par-container-above-map">
                    <p className="map-par-mobile">Mobile/tablet: Please use two fingers to zoom in or out on the map below</p>
                    <p className="map-par">Desktop: Please press Ctrl + Scroll to zoom in or out on the map below</p>
                </div>
                <Map latValue={lat_map_value} longValue={long_map_value} setLatLongErrorMessage={setLatLongErrorMessage} setLatLongError={setLatLongError} setLat={setLatValue} setLong={setLongValue}/> 
                <div className="volunteer__lat-long-error-message-red">{latLongErrorMessage}</div>

                <div className="volunteer__button-container">
                    <button type="submit" className="volunteer__button">Submit</button>
                    <button onClick={handleCancelClick} className="volunteer__button">Cancel</button>
                </div>
                <div>
                    {isOpenAfterSuccess && <PopupNoClose
                        content={<>
                        <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                        <p className="volunteer__registered">Clean up edited!</p>
                    </>}
                    />}
                </div>
            </form>
    )
};

function Map({latValue, longValue, setLatLongErrorMessage, setLatLongError, setLat, setLong}) {

    const[mapIcon] = useState(markerIcon);

    const[position, setPosition] = useState({ lat: latValue, lng: longValue})
  
    const [center] = useState({ lat: latValue, lng: longValue })
  
    const[zoom] = useState(3)
  
    const handleClickMap = event => { const lat = event.latLng.lat(); const lng = event.latLng.lng(); setLat(lat); setLong(lng); setPosition({ lat: lat, lng: lng}); setLatLongErrorMessage(""); setLatLongError(false)};
    return (
      <GoogleMap zoom={zoom} center={center} mapContainerClassName="map-container" onClick={(event) => {handleClickMap(event)}} >
        <MarkerF
          position={position}
          icon = {mapIcon}
        /></GoogleMap>
    );
  }

export default EditCleanUpsForm;
