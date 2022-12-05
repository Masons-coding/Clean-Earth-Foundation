import './SignUpPage.scss';
import SignUp from "../../components/SignUp/SignUp.js";
import Footer from "../../components/Footer/Footer.js";

const SignUpPage = () => {
    return (
        <>
        <section className="sign-up-page-background">
            <SignUp/>
        </section>
        <Footer/>
        </>
    );
};

export default SignUpPage;