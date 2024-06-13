
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import MapComponent  from '../components/GoogleMaps';
import '../scss/_about.scss';


export const About = () => {

  const render = (status: Status) => (<h1>{status}</h1>)


  return (
<div className="about-container">
      <header className="about-header">
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <a className="nav__link" href="#!">Home</a>
            </li>
            <li>
              <a className="nav__link" href="#!">About Us</a>
            </li>
            <li>
              <a className="nav__link" href="#!">Contact Us</a>
            </li>
            <li>
              <a className="nav__link" href="#!">Careers</a>
            </li>
            <li>
              <a className="nav__link" href="#!">Privacy Policy</a>
            </li>
            <li>
              <a className="nav__link" href="#!">Terms of Service</a>
            </li>
          </ul>
          
        </nav>
        <h1 className="page-title">About Us</h1>
      </header>
      <main>
        <article className="about-content">
          <section className="about-content__descriptor">
            <h2 className="about-content__title">Info</h2>
            <p className="about-content__text">
              Movie Mingle is your go-to platform for streaming a wide variety of movies and series from all genres. 
              Founded with a passion for cinema, we aim to provide our users with the best streaming experience.
            </p>
          </section>
          <section className="about-content__text-box">
<h3 className="about-content__title">Movie Mingles Vision & Mission</h3>
            <p className="about-content__text">
              Our vision is to become the most loved movie streaming service, offering a diverse and inclusive library 
              of films from around the world. Our mission is to bring people together through the love of movies.
            </p>

    <div className="map-container">
      <h2>Our Location</h2>
      <Wrapper apiKey={"AIzaSyCfUwbWGp-C_mL8Hhl2DT2DqpmL2EIPGLE"} render={render}>
        <MapComponent />
      </Wrapper>
     
      </div>
          </section>
        </article>
      </main>
    </div>
  );

}

export default About;
