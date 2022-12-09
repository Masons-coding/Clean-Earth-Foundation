import "./MarkerModal.scss"
import { useEffect, useState } from "react";
import axios from "axios";

import CancelIcon from "../../assets/images/icons/CancelIcon.svg";

export default function MarkerModal({ setOpenModal, cleanupId }) {

    function dateFunction(){
        return cleanUp.date_of_clean_up.slice(0,10);
    }

  const [cleanUp, setCleanUp] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/cleanups/cleanup/${cleanupId}`).then((response) => {
      setCleanUp(response.data);
    });
  });
  if (!cleanUp) return <div>info loading ...</div>;
  return (
    <div className="marker-modal">
      <img
        src={CancelIcon}
        className="marker-modal__close"
        alt="close icon"
        onClick={() => {
          setOpenModal(false);
        }}
      />
      <p>{`Clean up ran by: ${cleanUp.name}`}</p>
      <p>{`Clean up city: ${cleanUp.city}`}</p>
      <p>{`Clean up state: ${cleanUp.state}`}</p>
      <p>{`Clean up country: ${cleanUp.country}`}</p>
      <p>{`Clean up date: ${dateFunction()}`}</p>
    </div>
  );
}