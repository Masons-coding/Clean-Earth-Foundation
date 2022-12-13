import './ErrorPage.scss';

import errorImage from "../../assets/images/404.webp";
import Footer from "../../components/Footer/Footer.js";


const ErrorPage = () => {
    return (
        <>
        <p className="error-page__message">Page does not exist!</p>
        <div className="error-page__container">
            <img className="error-page__image" src={errorImage} alt="404 error"/>
        </div>
        <Footer/>
        </>
    );
};

export default ErrorPage;