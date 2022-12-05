import './LoginPage.scss';

import Footer from "../../components/Footer/Footer.js";
import Login from "../../components/Login/Login.js";

const LoginPage = () => {
    return (
        <>
        <section className="login-page-background">
            <Login/>
        </section>
        <Footer/>
        </>
    );
};

export default LoginPage;