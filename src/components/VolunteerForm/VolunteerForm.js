import './VolunteerForm.scss';

import { useState} from "react";

import { useNavigate } from "react-router-dom";

import axios from 'axios';

const VolunteerForm = () => {

    const [success, setSuccess] = useState(false);

    const navigateHomePage = useNavigate();

    const [nameErrorMessage, setNameErrorMessage] = useState("")

    const [name, setName] = useState("");

    const [nameError, setNameError] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        if(name !== ""){
            setNameError(false)
            setNameErrorMessage("")
        }
    };


    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if(email !== ""){
            setEmailError(false)
            setEmailErrorMessage("")
        }
    };


    const [cityErrorMessage, setCityErrorMessage] = useState("")
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);

    const handleCityChange = (event) => {
        setCity(event.target.value);
        if(city !== ""){
            setCityError(false)
            setCityErrorMessage("")
        }
    };


    const [stateErrorMessage, setStateErrorMessage] = useState("")
    const [state, setState] = useState("");
    const [stateError, setStateError] = useState(false);

    const handleStateChange = (event) => {
        setState(event.target.value);
        if(state !== ""){
            setStateError(false)
            setStateErrorMessage("")
        }
    };



    const [countryErrorMessage, setCountryErrorMessage] = useState("")
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState(false);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        if(country !== ""){
            setCountryError(false)
            setCountryErrorMessage("")
        }
    };


    const [dateErrorMessage, setDateErrorMessage] = useState("")
    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState(false);

    const handleDateChange = (event) => {
        setDate(event.target.value);
        if(dateError !== ""){
            setDateError(false)
            setDateErrorMessage("")
        }
    };


    const handleCancelClick = () => {
        navigateHomePage("/")
        window.scrollTo(0, 0)
      };


      const handleSubmitForm = (event) => {
        event.preventDefault()
        formValidation();
        function formValidation(){
            if(date === ""){
                setDateError(true)
                event.target.date.focus()
                setDateErrorMessage("Field required - please enter the date for your clean up")
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
            const emailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
            if(email === "" || !emailValid){
                setEmailError(true)
                event.target.email.focus()
                setEmailErrorMessage("Field required - please enter a valid email address")
            }
            if(name === ""){
                setNameError(true)
                event.target.name.focus()
                setNameErrorMessage("Field required - please enter your name")
            }
        }
        if(formValidation){
            axios
            .post("http://localhost:8080/cleanups/register", {
                name: name,
                email: email,
                city: city,
                state: state,
                country: country,
                date_of_clean_up: date,
                long_map_value: -80,
                lat_map_value: 44
            })
            .then(() => {
              setSuccess(true)
              setName("")
              setEmail("")
              setCity("")
              setState("")
              setCountry("")
              setDate("")
              setTimeout(() => {
                navigateHomePage("/");
              }, 1500);
            })
            .catch((error) => {
            });
        }
      };

    return (
            <form onSubmit={handleSubmitForm} className='volunteer'>
                <div className="volunteer__heading-container">
                    <h1 className="volunteer__heading">Get Involved with Clean Earth!</h1>
                    <p className="volunteer__text">Thank you for your commitment to making a difference. We are always looking for volunteers to participate in our vision of having a cleaner environment worldwide!</p>
                </div>
                <label className="volunteer__labels" htmlFor="name">Name:</label>
                <input type="text" placeholder="Please enter your name" value={name} onChange={handleNameChange} className={nameError === true ? 'volunteer__input-error' : 'volunteer__input' }  id="name" name="name"></input>
                <div className="volunteer__error-message">{nameErrorMessage}</div>

                <label className="volunteer__labels" htmlFor="name">Email:</label>
                <input type="text" placeholder="Please enter your email" value={email} onChange={handleEmailChange} className={emailError === true ? 'volunteer__input-error' : 'volunteer__input' } id="email" name="email"></input>
                <div className="volunteer__error-message">{emailErrorMessage}</div>

                <label className="volunteer__labels" htmlFor="name">City:</label>
                <input type="text" placeholder="Please enter your city" value={city} onChange={handleCityChange} className={cityError === true ? 'volunteer__input-error' : 'volunteer__input' } id="city" name="city"></input>
                <div className="volunteer__error-message">{cityErrorMessage}</div>

                <label className="volunteer__labels" htmlFor="name">State/Province:</label>
                <input type="text" placeholder="Please enter your state/province" value={state} onChange={handleStateChange} className={stateError === true ? 'volunteer__input-error' : 'volunteer__input' } id="state" name="state"></input>
                <div className="volunteer__error-message">{stateErrorMessage}</div>

                <label className="volunteer__labels" htmlFor="name">Country:</label>
                <input type="text" placeholder="Please enter your country" value={country} onChange={handleCountryChange} className={countryError === true ? 'volunteer__input-error' : 'volunteer__input' } id="country" name="country"></input>
                <div className="volunteer__error-message">{countryErrorMessage}</div>

                <label className="volunteer__labels" htmlFor="name">Date for clean up:</label>
                <input min={new Date().toISOString().slice(0, -8).split('T')[0]} type="date" onChange={handleDateChange} className={dateError === true ? 'volunteer__input-error' : 'volunteer__input' } id="date" name="date"></input>
                <div className="volunteer__error-message">{dateErrorMessage}</div>
                
                <label className="volunteer__labels" htmlFor="name">Location:</label>
                <p className="volunteer__text">Please select a location on the map (below) for your clean up</p>

                <div className="volunteer__button-container">
                    <button type="submit" className="volunteer__button">Submit</button>
                    <button onClick={handleCancelClick} className="volunteer__button">Cancel</button>
                </div>
                {success && <div className="volunteer__message">Clean up registered!</div>}
            </form>
    );
};
export default VolunteerForm;