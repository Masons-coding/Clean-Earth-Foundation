import './FeaturedInitiatives.scss';

import spacePicture from "../../assets/images/space.jpg";
import trailsPicture from "../../assets/images/trails1.jpg";
import oceanPicture from "../../assets/images/ocean1.jpg";

import { useNavigate  } from 'react-router-dom';

const FeaturedInitiatives = () => {

    const navigateinitiativesPage = useNavigate();

    const handleReadMoreClick = () => {
        navigateinitiativesPage("/initiative")
        window.scrollTo(0, 0)
    };

    return (
        <section className="initiatives">
            <div className="initiatives__container">
                <img className="initiatives__picture" src={spacePicture} alt="Space"/>
                <div className="initiatives__content">
                    <h2 className="initiatives__heading">Clean Earth Platform</h2>
                    <p className="initiatives__text">We are currently creating our platform to allow people to organize, share and run their own clean up events in their local areas. We are focused on inspiring park, trail, field, river, lake and ocean clean ups in local communities around the world.</p>
                </div>
            </div>
            <div className="initiatives__container">
                <img className="initiatives__picture" src={trailsPicture} alt="Trail"/>
                <div className="initiatives__content">
                    <h2 className="initiatives__heading">Clean Trails</h2>
                    <p className="initiatives__text">Our Clean Trail initiative has performed garbage cleanups in three continents and five countries; from Canada and the United States, to the United Kingdom, and all the way to Tanzania and Puerto Rico. Our team of volunteers has gone across the globe in an attempt to better the environment personally. We have removed over 500 pounds of trash from walking trails and nature preserves already. We are working on growing this initiative around the world and we would love for people to volunteer to lead hikes and cleanups.</p>
                </div>
            </div>
            <div className="initiatives__container">
                <img className="initiatives__picture" src={oceanPicture} alt="Ocean"/>
                <div className="initiatives__content">
                    <h2 className="initiatives__heading">Clean Oceans</h2>
                    <p className="initiatives__text">Our Clean Ocean initiative is focused on removing plastic pollution from the ocean and keeping it from getting there in the first place. By 2050 there is estimated to be more plastic than fish in the ocean. This is a scary, and unbelievable thought. We are working on leading our own cleanups, partnering with other cleanup organizations, and finding volunteers to lead their own cleanups in their local area. Keeping plastic out of the ocean will be achieved by going to the largest sources of the pollution and helping to create awareness about the environmental effect. Over 90% of the plastic pollution can be traced to just 10 rivers. We will then work with private organizations, local authorities, and other not for profits to create a recycling program so that the plastic waste will have a purpose for collection instead of ending up in landfills and in the water.</p>
                </div>
            </div>
            <button onClick={handleReadMoreClick} className="initiatives__button">Read More!</button>
        </section>
    );
};

export default FeaturedInitiatives;