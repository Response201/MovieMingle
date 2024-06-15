import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../components/GoogleMaps";
import "../scss/_about.scss";
import Footer from "../components/Footer";

export const About = () => {
  const render = (status: Status) => <h1>{status}</h1>;

  return (
    <>
    <div className="about-container">
      <header className="about-header">
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <a className="nav__link" href="#!">
                Contact Us
              </a>
            </li>
            <li>
              <a className="nav__link" href="#!">
                Careers
              </a>
            </li>
            <li>
              <a className="nav__link" href="#!">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="nav__link" href="#!">
                Terms of Service
              </a>
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
              Movie Mingle is your go-to platform for streaming a wide variety
              of movies and series from all genres. Founded with a passion for
              cinema, we aim to provide our users with the best streaming
              experience.
            </p>
            <h2 className="about-content__title">High-Quality Streaming</h2>
            <p className="about-content__text">
            We provide high-definition streaming to ensure you enjoy your movies and series in the best possible quality. Our platform supports multiple devices, so you can watch your favorite content on your TV, laptop, tablet, or smartphone.
            </p>

            <h2 className="about-content__title">Safe and Secure</h2>
            <p className="about-content__text">
            Your privacy and security are our top priorities. Movie Mingle uses state-of-the-art encryption technology to protect your personal information and payment details. Enjoy your movies with peace of mind, knowing that your data is safe with us.            </p>
            
            <h2 className="about-content__title">Join Us Today</h2>
            <p className="about-content__text">
           
            Experience the magic of movies with Movie Mingle. Whether you're a casual viewer or a film buff, we have something for everyone. Sign up today and start exploring the world of cinema from the comfort of your home.            </p>

          </section>
          <section className="about-content__text-box">
            <h3 className="about-content__title">
              Movie Mingles Vision & Mission
            </h3>
            <p className="about-content__text">
              Our vision is to become the most loved movie streaming service,
              offering a diverse and inclusive library of films from around the
              world. Our mission is to bring people together through the love of
              movies.
            </p>

            <div className="map-container">
              <h2>Our Location</h2>
              <Wrapper
                apiKey={"AIzaSyCfUwbWGp-C_mL8Hhl2DT2DqpmL2EIPGLE"}
                render={render}
              >
                <MapComponent />
              </Wrapper>
            </div>
          </section>
        </article>
      </main>
      
    </div>
    <Footer />
    </>
  );
};

export default About;
