import './ErrorPage.scss';

import Footer from "../../components/Footer/Footer.js";

import errorIcon from "../../assets/images/404Page.png"


const ErrorPage = () => {
    return (
        <>
        <div className="error-page__container">
            <img className="error-page__image" src={errorIcon} alt="404 error"/>
            <p className="error-page__message">SORRY, PAGE NOT FOUND!</p>
        </div>
        <Footer/>
        </>
    );
};

export default ErrorPage;