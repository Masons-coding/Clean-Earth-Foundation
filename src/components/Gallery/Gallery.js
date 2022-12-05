import './Gallery.scss';

import landscape1 from "../../assets/images/Landscape1.jpg";
import landscape2 from "../../assets/images/Landscape2.jpg";
import landscape3 from "../../assets/images/Landscape3.jpg";
import landscape4 from "../../assets/images/Landscape4.jpg";
import landscape5 from "../../assets/images/Landscape5.jpg";

const Gallery = () => {
    return (
        <div className="gallery-pictures">
            <img className="gallery-pictures__img" src={landscape1} alt="Moutain landscape"></img>
            <img className="gallery-pictures__img" src={landscape2} alt="Water landscape"></img>
            <img className="gallery-pictures__img" src={landscape3} alt="Lookout landscape"></img>
            <img className="gallery-pictures__img" src={landscape4} alt="waterfall"></img>
            <img className="gallery-pictures__img" src={landscape5} alt="Water landscape"></img>
        </div>
    );
};

export default Gallery;