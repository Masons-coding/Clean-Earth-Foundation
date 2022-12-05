import './VolunteerPage.scss';

import Footer from "../../components/Footer/Footer.js";
import VolunteerForm from "../../components/VolunteerForm/VolunteerForm.js";

const VolunteerPage = () => {
    return (
        <>
        <section className="volunteer-page">
            <VolunteerForm/>
        </section>
        <Footer/>
        </>
    );
};

export default VolunteerPage;