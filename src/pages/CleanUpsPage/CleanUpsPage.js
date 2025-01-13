//CHECK IF LOCATIONS ARE WAITING TO BE LOADED BEFORE THE PAGE LOADS

import './CleanUpsPage.scss';

import Footer from "../../components/Footer/Footer.js";
import LoadingScreen from "../../components/LoadingPage/LoadingPage.js";

import Popup from '../../components/PopUp/PopUp.js';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Geocode from "react-geocode";

import { useNavigate  } from 'react-router-dom';

import leadCleanUpIcon from "../../assets/images/icons/LeadCleanUpIcon.svg";
import joinCleanUpIcon from "../../assets/images/icons/JoinCleanUpIcon.svg"
import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";
import trashIcon from "../../assets/images/icons/TrashIcon2.svg";
import shareIcon from "../../assets/images/icons/Share-icon.svg";
import editIcon from "../../assets/images/icons/EditIcon.svg";
import instagramLogo from "../../assets/images/icons/InstagramIcon.svg";
import facebookLogo from "../../assets/images/icons/FacebookIcon.svg";
import twitterLogo from "../../assets/images/icons/TwitterIcon.svg";

const GEO_CODE = process.env.REACT_APP_GOOGLE_GEO_CODE_KEY;
const geoCode = `${GEO_CODE}`;

const USER_CURRENT = process.env.REACT_APP_USER_CURRENT_URL;

const API = process.env.REACT_APP_API_KEY;

const urlForUserCurrent =`${USER_CURRENT}${API}`;

const USER_CLEAN_UPS = process.env.REACT_APP_CLEAN_UPS_RAN;

const urlForUserCleanUps = USER_CLEAN_UPS;

const USER_CLEAN_UPS_JOINED = process.env.REACT_APP_CLEAN_UPS_JOINED_URL;

const urlForUserCleanUpsJoined = USER_CLEAN_UPS_JOINED;

const CLEAN_UP_DELETE = process.env.REACT_APP_DELETE_URL;

const urlForDelete =`${CLEAN_UP_DELETE}`;

const CLEAN_UP_JOINED_DELETE = process.env.REACT_APP_DELETE_JOINED_URL;

const urlForDeleteJoined =`${CLEAN_UP_JOINED_DELETE}`;

const ALL_CLEAN_UPS_JOINED = process.env.REACT_APP_ALL_CLEAN_UPS_JOINED_URL;

const urlForAllCleanUpsJoined = ALL_CLEAN_UPS_JOINED;

const CleanUpsPage = () => {

    let [x] = useState(0)

    let [xJoined] = useState(0)

    let [i] = useState(-1)

    let [iJoined] = useState(-1)

    let [iMobile] = useState(-1)

    let [iJoinedMobile] = useState(-1)
    
    const [deletedCleanUp, setDeletedCleanUp] = useState(0)

    const [deletedCleanUpJoined, setDeletedCleanUpJoined] = useState(0)

    const [shareCleanUpId, setShareCleanUpId] = useState(0)

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const togglePopupDelete = () => {
        setIsOpenDelete(!isOpenDelete);
      }

    const [isOpenDeleteJoined, setIsOpenDeleteJoined] = useState(false);

    const togglePopupDeleteJoined = () => {
        setIsOpenDeleteJoined(!isOpenDeleteJoined);
    }

    const [isOpenShare, setIsOpenShare] = useState(false);

    const togglePopupShare = () => {
        setIsOpenShare(!isOpenShare);
    }

    const [user, setUser] = useState({});
    const [failedAuth, setFailedAuth] = useState(true);

    const [cleanUpData, setCleanUpData] = useState([])

    const [cleanUpDataJoined, setCleanUpDataJoined] = useState([])
  
    const authToken = sessionStorage.getItem('authToken');

    const navigateVolunteerPage = useNavigate();

    const navigateEditPage = useNavigate();

    const navigateToHomePage = useNavigate();
  
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

    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      };
      
      const data ={
        clean_up_id: null
      }

    //Location for clean ups created
    const [location, setLocation] = useState([]);
    const [locationArray] = useState([]);

    //Location for clean ups joined
    const [locationJoined, setLocationJoined] = useState([]);
    const [locationArrayJoined] = useState([]);

    //Waits until all data has been loaded from the different locations before showing the data to the user
    let [isReadyCreatedCleanUps, setIsReadyCreatedCleanUps] = useState(false);
    let [isReadyJoinedCleanUps, setIsReadyJoinedCleanUps] = useState(false);

    Geocode.setApiKey(geoCode);

    async function getAddress(lat, long, data){
        isReadyCreatedCleanUps = false;
        const GeocodeGetAddress = await Geocode.fromLatLng(lat, long);
              let address = GeocodeGetAddress.results[0].formatted_address;
              locationArray.push(address);
              if(locationArray.length === data.length){
                setLocation(locationArray)
                setIsReadyCreatedCleanUps(true)
              }
            }

    async function getAddressJoined(lat, long, data){
        isReadyJoinedCleanUps = false;
        const GeocodeGetAddress = await Geocode.fromLatLng(lat, long);
                let address = GeocodeGetAddress.results[0].formatted_address;
                locationArrayJoined.push(address);
                if(locationArrayJoined.length === data.length){
                    setLocationJoined(locationArrayJoined)
                    setIsReadyJoinedCleanUps(true)
                }
        
            }

            

//Get cleans ups user has created
    useEffect(()=>{
        getData()
        async function getData(){
            try{
                const response = await axios.get(`${urlForUserCleanUps}/${user.id}${API}`)
                const data = await response.data
                setCleanUpData(data)
                if(data.length !== 0){
                    addressFunction(data)
                    async function addressFunction(response) {
                        for(let p = 0; p < response.length; p++){
                            let lat = response[p].lat_map_value;
                            let long = response[p].long_map_value;
                            await getAddress(lat, long, data);
                        }
                    }
                }else{
                    setIsReadyCreatedCleanUps(true)
                }

            } catch (error){
                console.log(error)
            }
        }
        
        getAllDataJoined()
        async function getAllDataJoined() {
            try {
                let allData = [];
                const allJoinedDataResponse = await axios.get(`${urlForAllCleanUpsJoined}/${user.id}${API}`);
                const allJoinedData = allJoinedDataResponse.data;

                if (!allJoinedData || allJoinedData.length === 0) {
                    allData = [];
                    setCleanUpDataJoined(allData);
                    setIsReadyJoinedCleanUps(true);
                } else {
                    for (let m = 0; m < allJoinedData.length; m++) {
                        try {
                            const response = await axios.get(`${urlForUserCleanUpsJoined}/${allJoinedData[m].clean_up_id}${API}`);
                            const joinedData = response.data;

                            if (joinedData.length !== 0) {
                                // Process addresses sequentially to maintain order
                                for (let p = 0; p < joinedData.length; p++) {
                                    const { lat_map_value: lat, long_map_value: long } = joinedData[p];
                                    await getAddressJoined(lat, long, allJoinedData); // Ensure each address is awaited
                                }
                            } else {
                                setIsReadyCreatedCleanUps(true);
                            }
                            // Add the new data to allData, flattening it directly
                            allData.push(...joinedData);
                        } catch (innerError) {
                            console.error('Error processing joinedMapData:', innerError);
                        }
                    }
                    setCleanUpDataJoined(allData);
                }
            } catch (error) {
                console.error('Error fetching all joined data:', error);
            }
        }
            
      },[user.id]); //Add value in here to stop the joined clean ups from showing for the wrong person


      const handleLeadClick = () => {
          navigateVolunteerPage("/volunteer")
          window.scrollTo(0, 0)
      };

      const handleJoinClick = () => {
        navigateToHomePage("/")
        window.scrollTo(0, 900);
    };

    function deleteClicked(id){
        setIsOpenDelete(!isOpenDelete);
        setDeletedCleanUp(id);
    }

    function deleteJoinedClicked(id){
        setIsOpenDeleteJoined(!isOpenDeleteJoined);
        setDeletedCleanUpJoined(id);
    }

    const handleEditClicked = (id) => {
        navigateEditPage(`/cleanUps/edit/${id}`)
    };

    const handleShareClicked = (id) => {
        setIsOpenShare(!isOpenShare);
        setShareCleanUpId(id);
    };

    const confirmClicked = () => {
        axios
          .delete(`${urlForDelete}/${deletedCleanUp}${API}`)
          .catch((err) => {
            console.log(err);
          });
          window.location.reload(false);
          setIsOpenDelete(!isOpenDelete);
      };

    const confirmClickedJoined = () => {
        axios
          .delete(`${urlForDeleteJoined}/${deletedCleanUpJoined}${API}`)
          .catch((err) => {
            console.log(err);
          });
          window.location.reload(false);
          setIsOpenDelete(!isOpenDeleteJoined);
    };

    const confirmInstagram = () => {
        console.log("instagram");
        setIsOpenShare(!isOpenShare);
    };

    const confirmFacebook = () => {
        console.log("facebook");
        setIsOpenShare(!isOpenShare);
    };

    const confirmTwitter = () => {
        console.log("twitter");
        setIsOpenShare(!isOpenShare);
    };

    if (!cleanUpData){
        return <LoadingScreen/>;
    } 

    if (!cleanUpDataJoined){
        return <LoadingScreen/>;
    }

    if (isReadyCreatedCleanUps === false || isReadyJoinedCleanUps === false){
        return <LoadingScreen/>;
    } 

    return (
        <>
        <section className="clean-ups">
            <div className="clean-ups__everything-container">
                <div className="clean-ups__my-clean-ups-ran">
                    <h2 className="clean-ups__title">Clean ups ran by me:</h2>
                    <div onClick={handleLeadClick} className="clean-ups__lead-container">
                        <img src={leadCleanUpIcon} alt="Map and pencil"/>
                        <button className="clean-ups__button-lead">Lead a clean up!</button>
                    </div>
                    <div className="clean-ups__title-container">
                        <p className="clean-ups__title-text-date">Date:</p>
                        <p className="clean-ups__title-text-time">Time:</p>
                        <p className="clean-ups__title-text-city">City:</p>
                        <p className="clean-ups__title-text-state">State:</p>
                        <p className="clean-ups__title-text-country">Country:</p>
                        <p className="clean-ups__title-text-location">Location:</p>
                    </div>
                    {cleanUpData.map((data)=>{
                        i++
                        return(
                        <div key={data.id} className="clean-ups__all-info-container">
                            <div className="clean-ups__info-container">
                                <p className="clean-ups__info-text-date">{data.date_of_clean_up.slice(0,10)}</p>
                                <p className="clean-ups__info-text-time">{data.time_of_clean_up}</p>
                                <p className="clean-ups__info-text-city">{data.city}</p>
                                <p className="clean-ups__info-text-state">{data.state}</p>
                                <p className="clean-ups__info-text-country">{data.country}</p>
                                <p className="clean-ups__info-text-location">{location[i]}</p>
                                <div className="clean-ups__del-edit-container">
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                    <img src={editIcon} onClick={() => handleEditClicked(data.id)} alt="Pencil" className="clean-ups__del-edit-img"></img>
                                    <img src={shareIcon} onClick={() => handleShareClicked(data.id)} alt="share-icon" className="clean-ups__del-edit-img"></img>
                                </div>
                            </div>
                        </div>
                        )
                    })}
    
    
                    <div className="clean-ups__mobile-main-container">
                        <div className="clean-ups__all-data-container-mobile">
                        {cleanUpData.map((data)=>{
                            iMobile++
                                x++
                            return(
                            <div key={data.id} className="clean-ups__all-info-container-mobile">
                                <div className="clean-ups__info-container">
                                    <p className="clean-ups__clean-up-count"> {`Clean up ${x}`}</p>
                                    <p className="clean-ups__info-text-date"><b>Date:</b> {`${data.date_of_clean_up.slice(0,10)}`}</p>
                                    <p className="clean-ups__info-text-time"><b>Time:</b> {`${data.time_of_clean_up}`}</p>
                                    <p className="clean-ups__info-text-city"><b>City:</b> {`${data.city}`}</p>
                                    <p className="clean-ups__info-text-state"><b>State:</b> {`${data.state}`}</p>
                                    <p className="clean-ups__info-text-country"><b>Country:</b> {`${data.country}`}</p>
                                    <p className="clean-ups__info-text-location-mobile"><b>Location:</b> {`${location[iMobile]}`}</p>
                                <div className="clean-ups__del-edit-container-mobile">
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                    <img src={editIcon} alt="Pencil" onClick={() => handleEditClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                    <img src={shareIcon} onClick={() => handleShareClicked(data.id)} alt="share-icon" className="clean-ups__del-edit-img"></img>
                                </div>
                                </div>
                            </div>
                            )
                        })}
                        </div>
    
                    </div>      
    
                </div>
                <div className="clean-ups__my-clean-ups-joined">
                    <h2 className="clean-ups__title">Clean ups I have joined:</h2>
                    <div onClick={handleJoinClick} className="clean-ups__join-container">
                        <img src={joinCleanUpIcon} alt="Map with place marker"/>
                        <button className="clean-ups__button-join" >Join a clean up!</button>
                    </div>
                    <div className="clean-ups__title-container">
                        <p className="clean-ups__title-text-date">Date:</p>
                        <p className="clean-ups__title-text-time">Time:</p>
                        <p className="clean-ups__title-text-city">City:</p>
                        <p className="clean-ups__title-text-state">State:</p>
                        <p className="clean-ups__title-text-country">Country:</p>
                        <p className="clean-ups__title-text-location">Location:</p>
                    </div>
                    {cleanUpDataJoined.map((data)=>{
                        iJoined++
                        return(
                        <div key={data.id} className="clean-ups__all-info-container">
                            <div className="clean-ups__info-container">
                                <p className="clean-ups__info-text-date">{data.date_of_clean_up.slice(0,10)}</p>
                                <p className="clean-ups__info-text-time">{data.time_of_clean_up}</p>
                                <p className="clean-ups__info-text-city">{data.city}</p>
                                <p className="clean-ups__info-text-state">{data.state}</p>
                                <p className="clean-ups__info-text-country">{data.country}</p>
                                <p className="clean-ups__info-text-location">{locationJoined[iJoined]}</p>
                                <div className="clean-ups__del-edit-container">
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteJoinedClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                </div>
                            </div>
                        </div>
                        )
                    })}

                    <div className="clean-ups__mobile-main-container">
                            <div className="clean-ups__all-data-container-mobile">
                            {cleanUpDataJoined.map((data)=>{
                                iJoinedMobile++
                                    xJoined++
                                return(
                                <div key={data.id} className="clean-ups__all-info-container-mobile">
                                    <div className="clean-ups__info-container">
                                        <p className="clean-ups__clean-up-count" > {`Clean up ${xJoined}`}</p>
                                        <p className="clean-ups__info-text-date"><b>Date:</b> {`${data.date_of_clean_up.slice(0,10)}`}</p>
                                        <p className="clean-ups__info-text-time"><b>Time:</b> {`${data.time_of_clean_up}`}</p>
                                        <p className="clean-ups__info-text-city"><b>City:</b> {`${data.city}`}</p>
                                        <p className="clean-ups__info-text-state"><b>State:</b> {`${data.state}`}</p>
                                        <p className="clean-ups__info-text-country"><b>Country:</b> {`${data.country}`}</p>
                                        <p className="clean-ups__info-text-location-mobile"><b>Location:</b> {`${locationJoined[iJoinedMobile]}`}</p>
                                    <div className="clean-ups__del-edit-container-mobile">
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteJoinedClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                    </div>
                                    </div>
                                </div>
                                )
                            })}
                            </div>
        
                    </div>  
                </div>
                <div>
                {isOpenDelete && <Popup
                    content={<>
                    <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                    <h1 className="clean-ups__pop-up-header">Do you wish to delete this clean up?</h1>
                    <div className="clean-ups__pop-up-button-container">
                        <button onClick={confirmClicked} className="clean-ups__pop-up-button">DELETE</button>
                    </div>
                </>}
                handleClose={togglePopupDelete}
                />}
                </div>

                <div>
                {isOpenDeleteJoined && <Popup
                    content={<>
                    <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                    <h1 className="clean-ups__pop-up-header">Do you wish to unjoin this clean up?</h1>
                    <div className="clean-ups__pop-up-button-container">
                        <button onClick={confirmClickedJoined} className="clean-ups__pop-up-button">CONFIRM</button>
                    </div>
                </>}
                handleClose={togglePopupDeleteJoined}
                />}
                </div>

                <div>
                {isOpenShare && <Popup
                    content={<>
                    <img className="clean-earth-logo-pop-up" src={cleanEarthLogo} alt="CleanEarth Logo"/>
                    <h1 className="clean-ups__pop-up-header">Where would you like to share this?</h1>
                    <div className="social-media-share-container">
                        <img onClick={confirmInstagram} className="header__instagram-logo" src={instagramLogo} alt="Instagram logo"/>
                        <img onClick={confirmFacebook} className="header__facebook-logo" src={facebookLogo} alt="Facebook logo"/>
                        <img onClick={confirmTwitter} className="header__twitter-logo" src={twitterLogo} alt="Twitter logo"/>
                    </div>
                    <div className="clean-ups__pop-up-button-container">
                    </div>
                </>}
                handleClose={togglePopupShare}
                />}
                </div>

            </div>
        </section>
        <Footer/>
        </>
    );

};

export default CleanUpsPage;