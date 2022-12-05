import './GalleryPage.scss';

import Footer from "../../components/Footer/Footer.js";

import Gallery from "../../components/Gallery/Gallery.js";

const GalleryPage = () => {
    return (
        <>
        <section className="gallery">
            <Gallery/>
        </section>
        <Footer/>
        </>
    );
};

export default GalleryPage;