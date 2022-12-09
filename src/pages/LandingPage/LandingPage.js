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


const LandingPage = () => {
  window.scrollTo(0, 0)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHzmp87aN7Sgnqm9r5uloMJMNrLC_RB3M",
  });

  if (!isLoaded){
    return <div>Loading...</div>;
  } 

    return (
        <>
        <div className="App">
          <Hero/>
          <Banner/>
          <Map/>
          <FeaturedInitiatives/>
          <Footer/>
        </div>
        </>
    );
};

function Map() {
  const {id} = useParams()

  const [cleanUpData, setCleanUpData] = useState([]);

  const [locationId, setLocationId] = useState("")

  const [openModal, setOpenModal] = useState(false)

  useEffect(()=>{
    axios
    .get("http://localhost:8080/cleanups/cleanup")
    .then((response) => {
     setCleanUpData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[id]);


  if(!cleanUpData) return<div>Map Loading...</div>;

  return (
    <GoogleMap zoom={2} center={{ lat: 44, lng: -80 }} mapContainerClassName="map-container">
      {cleanUpData.map((cleanUp)=>{
 return (
  <MarkerF
    position={{ lat: cleanUp.lat_map_value, lng: cleanUp.long_map_value }}
    key={cleanUp.id}
    onClick={() => {
      setLocationId(cleanUp.id);
      setOpenModal(true);
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