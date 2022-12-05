import './AboutPage.scss';

import About from "../../components/About/About.js";
import Footer from "../../components/Footer/Footer.js";

const AboutPage = () => {
    return (
        <>
        <section className="about">
            <About/>
        </section>
        <Footer/>
        </>
    );
};

export default AboutPage;