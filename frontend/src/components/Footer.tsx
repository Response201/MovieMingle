
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__about">
          <h2 className="footer__title">Movie Mingle</h2>
          <p className="footer__description">
            Movie Mingle is your go-to platform for streaming a wide variety of movies and series from all genres.
          </p>
        </div>
        <div className="footer__links">
          <h2 className="footer__title">Quick Links</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer__social">
          <h2 className="footer__title">Follow Us</h2>
          <div className="footer__social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer__contact">
          <h2 className="footer__title">Contact Us</h2>
          <p>Email: contact@moviemingle.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Movie Mingle. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
