import { Link } from 'react-router-dom';

import HamburgerMenu from './HamburgerMenu';
import { Login } from './login';

const Navigation = () => {

    return (
      <>
      <nav className="responsive-nav"> <HamburgerMenu
      />

      </nav>
      <nav className="navigation">
      <div className="navigation__brand">
        <Link to="/">Movie Mingle</Link>
      </div>
      <div className="navigation__container">
      <ul className="navigation__links">
        <li className="navigation__item"><Link to="/">Home</Link></li>
        <li className="navigation__item"><Link to="/movies">Series</Link></li>
        <li className="navigation__item"><Link to="/movies">Movies</Link></li>
        <li className="navigation__item"><Link to="/notfoud">Drama</Link></li>
        <li className="navigation__item"><Link to="/notfound">Action</Link></li>
        <li className="navigation__item"><Link to="/notfound">Drama</Link></li>
        <li className="navigation__item"><Link to="/notfound">Fantasy</Link></li>
        <li className="navigation__item"><Link to="/notfound">Comedy</Link></li>
        <li className="navigation__item"><Link to="/notfound">Science Fiction</Link></li>
        <li className="navigation__item"><Link to="/notfound">Romance</Link></li>
        <li className="navigation__item"><Link to="/notfound">Family</Link></li>
      
      
      </ul>
      <div className="nav-icons">
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 2048 2048"><path fill="white" d="M1024 779q51 0 95 19t78 53t52 77t20 96q0 51-19 95t-53 78t-77 52t-96 20q-51 0-95-19t-78-53t-52-77t-20-96q0-51 19-95t53-78t77-52t96-20m0 384q29 0 54-11t44-29t30-44t11-55t-11-54t-29-44t-44-30t-55-11t-54 11t-44 29t-30 44t-11 55t11 54t29 44t44 30t55 11m716-855q72 71 127 154t93 174t57 189t20 199q0 101-19 199t-58 189t-93 174t-127 154l-75-75q64-64 113-138t83-156t51-169t18-178q0-90-17-177t-51-170t-83-156t-114-138zM383 383q-64 64-113 138t-84 156t-51 169t-18 178q0 90 17 177t52 170t83 156t114 138l-75 75q-72-71-127-154t-93-174t-57-189t-20-199q0-101 19-199t58-189t93-174t127-154zm1086 196q89 90 136 204t48 241q0 126-47 240t-137 205l-75-75q74-74 113-169t40-201q0-105-39-200t-114-170zm-815 75q-74 74-113 169t-40 201q0 105 39 200t114 170l-75 75q-89-90-136-204t-48-241q0-126 47-240t137-205z"/></svg>
</div>
<Login /> 
      </div>
      
    </nav>
    </>

    );
  };
  
  export default Navigation;

