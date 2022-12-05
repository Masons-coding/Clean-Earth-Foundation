import './Products.scss';

import tShirtPicture from "../../assets/images/tshirt.png";
import greenBraceletPicture from "../../assets/images/bracelet-blue.jpg";
import blueBraceletPicture from "../../assets/images/bracelet-green.jpg";

const Products = () => {
    return (
        <>
        <section className="products-list">
            <div className="products-list-tag__container">
                <h1 className="products-list-tag__title">PRODUCTS</h1>
                <p className="products-list-tag__text">100% Of All Donations For Products Go Towards Clean Earth Environmental Initiatives! This helps us run our clean ocean project to stop plastics from reaching the ocean, lakes, and rivers. This also helps us run our trail cleanups around the world to help keep the forest and nature clean.</p>
            </div>
            <div className="products-list__everything-container">
                <div className="products-list__container">
                    <img className="products-list__bracelet-blue" src={blueBraceletPicture} alt="Blue bracelet"/>
                    <p className="products-list__title">Clean Earth Ocean Bracelet</p>
                    <p className="products-list__text">A Clean Earth branded bracelet made entirely from recycled materials (Blue). Expandable up to 10 inches, for everyone.</p>
                    <button className="products-list__button">$12</button>
                </div>
                <div className="products-list__container">
                    <img className="products-list__bracelet-green" src={greenBraceletPicture} alt="Green bracelet"/>
                    <p className="products-list__title">Clean Earth Forest Bracelet</p>
                    <p className="products-list__text">A Clean Earth branded bracelet made entirely from recycled materials (Green). Expandable up to 10 inches for everyone.</p>
                    <button className="products-list__button">$12</button>
                </div>
                <div className="products-list__container">
                    <img className="products-list__shirt" src={tShirtPicture} alt="Clean Earth t-shirt"/>
                    <p className="products-list__title">Clean Earth T-shirt</p>
                    <p className="products-list__text">A Clean Earth Branded t-shirt for both men and women (Black)</p>
                    <button className="products-list__button">$25</button>
                </div>
            </div>
        </section>
        </>
    );
};

export default Products;