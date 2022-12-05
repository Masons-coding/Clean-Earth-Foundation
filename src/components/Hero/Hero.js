import "./Hero.scss"

import { useNavigate  } from 'react-router-dom';
  
const Hero = () => {

  const navigateVolunteerPage = useNavigate();

  const handleVolunteerClick = () => {
      navigateVolunteerPage("/volunteer")
      window.scrollTo(0, 0)
  };
  
  return (
    <section className="hero">
      <div className="hero__text-button-container">
        <h1 className="hero__title">WELCOME TO CLEAN EARTH</h1>
        <p className="hero__text">Register to become a volunteer with Clean Earth and we will notify you if there are cleanup events going on in your region or help you run your own event!</p>
        <button onClick={handleVolunteerClick} className="hero__button">Volunteer today!</button>
      </div>
    </section>
  )
}
export default Hero;