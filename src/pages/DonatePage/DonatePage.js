import './DonatePage.scss';

import Footer from "../../components/Footer/Footer.js";
import Donate from "../../components/Donate/Donate.js";

const DonatePage = () => {
    return (
        <>
        <section className="donate-page">
            <Donate/>
        </section>
        <Footer/>
        </>
    );
};

export default DonatePage;