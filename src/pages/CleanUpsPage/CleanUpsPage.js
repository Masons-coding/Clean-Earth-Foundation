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
import editIcon from "../../assets/images/icons/EditIcon.svg";

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

const CleanUpsPage = () => {

    let [x] = useState(0)

    let [i] = useState(-1)

    let [iJoined] = useState(-1)

    let [iMobile] = useState(-1)
    
    const [deletedCleanUp, setDeletedCleanUp] = useState(0)

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const togglePopupDelete = () => {
        setIsOpenDelete(!isOpenDelete);
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

    //Location for clean ups created
    const [location, setLocation] = useState([]);
    const [locationArray] = useState([]);

    //Location for clean ups joined
    const [locationJoined, setLocationJoined] = useState([]);
    const [locationArrayJoined] = useState([]);

    Geocode.setApiKey(geoCode);

    async function getAddress(lat, long, data){
        const GeocodeGetAddress = await Geocode.fromLatLng(lat, long);
              let address = GeocodeGetAddress.results[0].formatted_address;
              locationArray.push(address);
              if(locationArray.length === data.length){
                setLocation(locationArray)
              }

            }

    async function getAddressJoined(lat, long, data){
        const GeocodeGetAddress = await Geocode.fromLatLng(lat, long);
                let address = GeocodeGetAddress.results[0].formatted_address;
                locationArrayJoined.push(address);
                if(locationArrayJoined.length === data.length){
                setLocationJoined(locationArrayJoined)
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
                addressFunction(data)
                async function addressFunction(response) {
                    for(let p = 0; p < response.length; p++){
                        let lat = response[p].lat_map_value;
                        let long = response[p].long_map_value;
                        await getAddress(lat, long, data);
                    }
                }
            } catch (error){
                console.log(error)
            }
        }
            
      },[user.id]);


//Get cleans ups user has joined
      useEffect(()=>{
        getData()
        async function getData(){
            try{
                const response = await axios.get(`${urlForUserCleanUpsJoined}/${user.clean_up_id}${API}`)
                const data = await response.data
                setCleanUpDataJoined(data)
                addressFunction(data)
                async function addressFunction(response) {
                    for(let p = 0; p < response.length; p++){
                        let lat = response[p].lat_map_value;
                        let long = response[p].long_map_value;
                        await getAddressJoined(lat, long, data);
                    }
                }
            } catch (error){
                console.log(error)
            }
        }
            
      },[user.clean_up_id]);

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

    const handleEditClicked = (id) => {
        navigateEditPage(`/cleanUps/edit/${id}`)
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

    if (!cleanUpData){
        return <LoadingScreen/>;
    } 

    if (!cleanUpDataJoined){
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
                                    <p className="clean-ups__clean-up-count" > {`Clean up ${x}`}</p>
                                    <p className="clean-ups__info-text-date">{`Date: ${data.date_of_clean_up.slice(0,10)}`}</p>
                                    <p className="clean-ups__info-text-time">{`Time: ${data.time_of_clean_up}`}</p>
                                    <p className="clean-ups__info-text-city">{`City: ${data.city}`}</p>
                                    <p className="clean-ups__info-text-state">{`State: ${data.state}`}</p>
                                    <p className="clean-ups__info-text-country">{`Country: ${data.country}`}</p>
                                    <p className="clean-ups__info-text-location-mobile">{`Location: ${location[iMobile]}`}</p>
                                <div className="clean-ups__del-edit-container-mobile">
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                    <img src={editIcon} alt="Pencil" onClick={() => handleEditClicked(data.id)} className="clean-ups__del-edit-img"></img>
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
                                    <img src={trashIcon} alt="Trash Can" onClick={() => deleteClicked(data.id)} className="clean-ups__del-edit-img"></img>
                                </div>
                            </div>
                        </div>
                        )
                    })}
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
            </div>
        </section>
        <Footer/>
        </>
    );

};

export default CleanUpsPage;