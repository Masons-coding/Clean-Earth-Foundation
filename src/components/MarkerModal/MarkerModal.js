import "./MarkerModal.scss"
import { useEffect, useState } from "react";
import axios from "axios";

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

import CancelIcon from "../../assets/images/icons/CancelIcon.svg";

import Geocode from "react-geocode";

const MARKER_MODAL = process.env.REACT_APP_MARKER_MODAL_URL;

const API = process.env.REACT_APP_API_KEY;

const markerModalUrl =`${MARKER_MODAL}`;

const api = `${API}`

const GEO_CODE = process.env.REACT_APP_GOOGLE_GEO_CODE_KEY;
const geoCode = `${GEO_CODE}`;

export default function MarkerModal({ setOpenModal, cleanupId }) {
  Geocode.setApiKey(geoCode);

  function geoCodeAddress(lat, long){
    Geocode.fromLatLng(lat, long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address)
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

  useEffect(() => {
    axios.get(`${markerModalUrl}${cleanupId}${api}`).then((response) => {
      setCleanUp(response.data);
      setDate(dateFunction(response.data.date_of_clean_up));
      geoCodeAddress(response.data.lat_map_value, response.data.long_map_value);
    });
  },[cleanupId]);

  if (!cleanUp) return <div>info loading ...</div>;

  return (
    <div className="marker-modal">

        <div className="marker-modal-images-container">
            <img  className="clean-earth-logo" src={cleanEarthLogo} alt="CleanEarth Logo"/>
            <img
                src={CancelIcon}
                className="marker-modal__close"
                alt="close icon"
                onClick={() => {
                setOpenModal(false);
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
                    <h2 className="header-text">Clean up location:</h2>
                </div>


                <div className="par-container">
                    <p className="par">{cleanUp.name}</p>
                    <p className="par">{cleanUp.city}</p>
                    <p className="par">{cleanUp.state}</p>
                    <p className="par">{cleanUp.country}</p>
                    <p className="par">{date}</p>
                    <p className="par">{address}</p>
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
            </div>

    </div>
  );
}