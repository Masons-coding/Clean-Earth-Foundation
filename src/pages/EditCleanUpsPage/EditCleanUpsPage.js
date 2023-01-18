import EditCleanUpsForm from '../../components/EditCleanUpsForm/EditCleanUpsForm.js';

import { useState, useEffect } from "react";

import { useParams} from "react-router-dom";

import axios from "axios";

import LoadingScreen from "../../components/LoadingPage/LoadingPage.js"

import './EditCleanUpsPage.scss';

const API = process.env.REACT_APP_API_KEY;

const CLEAN_UP_URL = process.env.REACT_APP_CLEAN_UP_URL;

const cleanUpsUrl = CLEAN_UP_URL;

const EditCleanUpsPage = () => {
  
    const [cleanUpsToDisplay, setcleanUpsToDisplay] = useState(null);
  
    const { id } = useParams();
  
    useEffect(() => {
        axios.get(`${cleanUpsUrl}${id}${API}`).then((response) => {
            setcleanUpsToDisplay(response.data);
        });
      },[id]);

    if(!cleanUpsToDisplay){
        return <LoadingScreen/>;
    }

    return (
        <div className="clean-ups-edit-page">
            <EditCleanUpsForm cleanUpsToDisplay={cleanUpsToDisplay}/>
        </div>
        );
};

export default EditCleanUpsPage;
