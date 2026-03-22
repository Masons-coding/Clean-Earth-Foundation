import './SocialMediaPage.scss';
import SocialMediaPage from "../../components/SocialMediaPage/SocialMediaPage";
import Footer from "../../components/Footer/Footer.js";

const SignUpPage = () => {
    return (
        <>
        <section className="social-media-page-background">
            <SocialMediaPage/>
        </section>
        <Footer/>
        </>
    );
};

export default SignUpPage;