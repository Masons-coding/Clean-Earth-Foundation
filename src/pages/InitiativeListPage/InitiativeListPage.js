import './InitiativeListPage.scss';

import InitiativeList from "../../components/InitiativeList/InitiativeList.js";
import Footer from "../../components/Footer/Footer.js";

const InitiativeListPage = () => {
    return (
        <>
        <section className="initiativeListPage">
            <div className="initiativeListPage__container">
                <h1 className="initiativeListPage__title">INITIATIVE LIST</h1>
            </div>
        <div>
            <InitiativeList/>
        </div>
        </section>
        <Footer/>
        </>
    );
};

export default InitiativeListPage;