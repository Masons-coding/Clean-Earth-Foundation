import './LandingPage.scss';
import Hero from "../../components/Hero/Hero.js";
import FeaturedInitiatives from "../../components/FeaturedInitiatives/FeaturedInitiatives.js";

import Banner from "../../components/Banner/Banner.js";

import Footer from "../../components/Footer/Footer.js";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import axios from "axios";

import { useState, useEffect} from "react";
import { useParams} from 'react-router-dom';

import MarkerModal from "../../components/MarkerModal/MarkerModal.js";

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import markerIcon from "../../assets/images/icons/MapIcon2.png"

const GOOGLE_API = process.env.REACT_APP_GOOGLE_MPAS_API_KEY;
const googleApi = `${GOOGLE_API}`;

const LANDING_PAGE = process.env.REACT_APP_LANDING_PAGE_URL;

const API = process.env.REACT_APP_API_KEY;

const landingPageUrl =`${LANDING_PAGE}${API}`;

const LandingPage = () => {
  window.scrollTo(0, 0)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApi,
  });

  if (!isLoaded){
    return <LoadingScreen/>;
  } 

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
          <FeaturedInitiatives/>
          <Footer/>
        </div>
        </>
    );
};

function Map() {

  const[mapIcon] = useState(markerIcon);

  const [center, setCenter] = useState({ lat: 39, lng: 34 })

  const[zoom] = useState(2.3)

  const {id} = useParams()

  const [cleanUpData, setCleanUpData] = useState([]);

  const [locationId, setLocationId] = useState("")

  const [openModal, setOpenModal] = useState(false)

  useEffect(()=>{
    axios
    .get(landingPageUrl)
    .then((response) => {
     setCleanUpData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[id]);


  if(!cleanUpData) return<loadingScreen/>;

  return (
    <GoogleMap zoom={zoom} center={center} mapContainerClassName="map-container">
      {cleanUpData.map((cleanUp)=>{
 return (
  <MarkerF
    position={{ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value }}
    key={cleanUp.id}
    icon = {mapIcon}
    onClick={() => {
      setLocationId(cleanUp.id);
      setOpenModal(true);
      setCenter({ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value })
    }}
  />
);
})}
      {openModal && (
        <MarkerModal
          setOpenModal={setOpenModal}
          cleanupId={locationId}
          key={id}
        />
      )}
    </GoogleMap>
  );
}

export default LandingPage;