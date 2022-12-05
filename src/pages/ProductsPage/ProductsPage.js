import './ProductsPage.scss';

import Products from "../../components/Products/Products.js";
import Footer from "../../components/Footer/Footer.js";

const ProductsPage = () => {
    return (
        <>
        <section className="products">
            <Products/>
        </section>
        <Footer/>
        </>
    );
};

export default ProductsPage;