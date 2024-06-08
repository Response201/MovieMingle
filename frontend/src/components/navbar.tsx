import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
      <nav className="navigation">
      <div className="navigation__brand">
        <Link to="/">Movie Mingle</Link>
      </div>
      <div className="navigation__container">
      <ul className="navigation__links">
        <li className="navigation__item"><Link to="/">Home</Link></li>
        <li className="navigation__item"><Link to="/movies">Movies</Link></li>
        <li className="navigation__item"><Link to="/notfoud">Drama</Link></li>
        <li className="navigation__item"><Link to="/notfound">Music Video</Link></li>
        <li className="navigation__item"><Link to="/notfound">Liveshow</Link></li>
      </ul>
      <button className="navigation__button">Sign In</button>
      </div>
    </nav>
    

    );
  };
  
  export default Navigation;

