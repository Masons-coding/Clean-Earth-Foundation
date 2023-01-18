import "./App.scss";

import LandingPage from "./pages/LandingPage/LandingPage.js";
import AboutPage from "./pages/AboutPage/AboutPage.js";
import InitiativeListPage from "./pages/InitiativeListPage/InitiativeListPage.js";
import DonatePage from "./pages/DonatePage/DonatePage.js";
import GalleryPage from "./pages/GalleryPage/GalleryPage.js";
import ProductsPage from "./pages/ProductsPage/ProductsPage.js";
import VolunteerPage from "./pages/VolunteerPage/VolunteerPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import CleanUpsPage from "./pages/CleanUpsPage/CleanUpsPage.js"

import EditCleanUpsPage from "./pages/EditCleanUpsPage/EditCleanUpsPage.js"

import SignUpPage from "./pages/SignUpPage/SignUpPage.js";

import Header from "./components/Header/Header.js";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/cleanups" element={<CleanUpsPage/>} />
        <Route path='/cleanups/edit/:id' element={<EditCleanUpsPage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/initiative" element={<InitiativeListPage/>} />
        <Route path="/donate" element={<DonatePage/>} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/volunteer" element={<VolunteerPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
