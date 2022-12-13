import Lottie from "lottie-react";
import loadingScreen from "../../assets/images/LoadingScreen.json";

const LoadingPage = () => {
    return (
        <Lottie animationData={loadingScreen} loop={true} />
    );
};

export default LoadingPage;
