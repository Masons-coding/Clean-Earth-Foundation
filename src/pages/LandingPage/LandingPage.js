import './LandingPage.scss';
import Hero from "../../components/Hero/Hero.js";
import FeaturedInitiatives from "../../components/FeaturedInitiatives/FeaturedInitiatives.js";

import Banner from "../../components/Banner/Banner.js";

import Footer from "../../components/Footer/Footer.js";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import Geocode from "react-geocode";

import axios from "axios";

import { useState, useEffect} from "react";
import { useParams} from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

import MarkerModal from "../../components/MarkerModal/MarkerModal.js";

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import markerIcon from "../../assets/images/Clean-Earth-Logo.svg"

import trashIcon from "../../assets/images/icons/TrashIcon.svg"
import cleanUpsIcon from "../../assets/images/icons/CleanUpsIcon.png"
import volunteerIcon from "../../assets/images/icons/VolunteerIcon.svg"

import leadCleanUpIcon from "../../assets/images/icons/LeadCleanUpIcon.svg";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MPAS_API_KEY;
const googleApi = `${GOOGLE_API}`;

const LANDING_PAGE = process.env.REACT_APP_LANDING_PAGE_URL;

const API = process.env.REACT_APP_API_KEY;

const landingPageUrl =`${LANDING_PAGE}${API}`;

const GEO_CODE = process.env.REACT_APP_GOOGLE_GEO_CODE_KEY;
const geoCode = `${GEO_CODE}`;

const LandingPage = () => {

  const navigateVolunteerPage = useNavigate();

  const handleLeadClick = () => {
    navigateVolunteerPage("/volunteer")
    window.scrollTo(0, 0)
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApi,
  });

  if (!isLoaded){
    return <LoadingScreen/>;
  }

  if(!GoogleMap) return<LoadingScreen/>;

    return (
        <>
        <div className="App">
          <Hero/>
          <Banner/>
          <div className="above-map-container">
            <h2 className="map-header">OUR CLEAN UPS AROUND THE WORLD:</h2>
            <div className="par-container-above-map">
              <p className="map-par-mobile">Mobile/tablet: Please use two fingers to zoom in or out on the map below</p>
              <p className="map-par">Desktop: Please press Ctrl + Scroll to zoom in or out on the map below</p>
            </div>
          </div>
          <Map/>
          <div className="totals">
            <div className="totals__everything-container">
              <div className="totals__text-container">
                <div className="totals__container">
                  {/* <p className="totals__title">Pounds of trash collected :</p> */}
                  <p className="totals__text">1300 POUNDS OF TRASH COLLECTED</p>
                  <img className="totals__picture" src={trashIcon} alt="Trash can"/>
                </div>
                <div className="totals__container">
                  {/* <p className="totals__title">Clean ups ran :</p> */}
                  <p className="totals__text">10 CLEAN UPS RAN</p>
                  <img className="totals__picture-world"  src={cleanUpsIcon} alt="Hands holding over earth"/>
                </div>
                <div className="totals__container">
                  {/* <p className="totals__title">Total volunteers :</p> */}
                  <p className="totals__text">100 VOLUNTEERS</p>
                  <img className="totals__picture" src={volunteerIcon} alt="Hands holding over earth"/>
                </div>
              </div>
              <div onClick={handleLeadClick} className="totals__lead-container">
                <img src={leadCleanUpIcon} alt="Map and pencil"/>
                <button className="totals__button-lead">Lead a clean up!</button>
              </div>
            </div>
          </div>
          <FeaturedInitiatives/>
          <Footer/>
        </div>
        </>
    );
};

function Map() {

  const [joinMapTextClass, setJoinMapTextClass] = useState("map-join-par")

  const[mapIcon] = useState(markerIcon);

  const [center, setCenter] = useState({ lat: 48.1667, lng: -100.1667 })

  const[zoom, setZoom] = useState(3.7)

  const {id} = useParams()

  const [cleanUpData, setCleanUpData] = useState([]);

  const [locationId, setLocationId] = useState("")

  const [userId, setUserId] = useState("")

  const [openModal, setOpenModal] = useState(false)

  const [failedAuth, setFailedAuth] = useState(true);

  const [locationArray] = useState([]);

  const [locationArrayAfterMap, setLocationArrayAfterMap] = useState([]);

  const authToken = sessionStorage.getItem('authToken');

  // if there is an error from the endpoint (ie: token invalid, expired, tampered with)
  useEffect(() => {
      if (!authToken){
          setJoinMapTextClass("map-join-par-hidden")
          setFailedAuth(true);
      }else{
        setJoinMapTextClass("map-join-par")
      }

  }, [authToken]);

  useEffect(()=>{
    axios
    .get(landingPageUrl)
    .then((response) => {
     setCleanUpData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  if(!cleanUpData) return<LoadingScreen/>;

  Geocode.setApiKey(geoCode);

  return (
      <GoogleMap zoom={zoom} center={center} mapContainerClassName="map-container" onClick={(event) => {setOpenModal(false)}}>
      <p className={joinMapTextClass}>Select a marker to join!</p>
      {cleanUpData.map((cleanUp)=>{
        //GOOGLE MAPS CLUSTERS
        const data = Array.from({ length: 1 }, () => ({ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value }));
          locationArray.push(data);
          console.log(locationArray)
          // if(locationArray.length === cleanUpData.length){
          //   console.log(locationArray)
          //   setLocationArrayAfterMap(locationArray)
          //   console.log(locationArrayAfterMap)
          // }
 return (
  <MarkerF
    position={{ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value }}
    key={cleanUp.id}
    icon = {mapIcon}
    onClick={() => {
      setJoinMapTextClass("map-join-par-hidden")
      setZoom(20)
      setLocationId(cleanUp.id);
      setUserId(cleanUp.user_id)
      setOpenModal(true);
      setCenter({ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value })
    }}
  />
);
})}
      {openModal && (
        <MarkerModal
          setZoom={setZoom}
          setOpenModal={setOpenModal}
          cleanupId={locationId}
          userId={userId}
          key={id}
        />
      )}
      </GoogleMap>
  );
}

export default LandingPage;