import './LandingPage.scss';
import Hero from "../../components/Hero/Hero.js";
import FeaturedInitiatives from "../../components/FeaturedInitiatives/FeaturedInitiatives.js";

import Banner from "../../components/Banner/Banner.js";

import Footer from "../../components/Footer/Footer.js";


const LandingPage = () => {
    return (
        <>
        <div className="App">
          <Hero/>
          <Banner/>
          <FeaturedInitiatives/>
          <Footer/>
        </div>
        </>
    );
};

export default LandingPage;