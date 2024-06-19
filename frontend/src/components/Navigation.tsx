import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useGlobalContext } from "../contexts/GlobalContext";
import FetchAllGenres from "../services/FetchAllGenres";
import Login from "./Login";


const Navigation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { genre, setGenre } = useGlobalContext();

  useEffect(() => {
    if (genre.length <= 0) {
      const fetchData = async () => {
        const genre = await FetchAllGenres();

        setGenre(genre);
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 768 ? (
        <nav className="responsive-nav">
          <HamburgerMenu />
        </nav>
      ) : (
        <nav className="navigation">
          <div className="navigation__brand">
            <Link to="/">Movie Mingle</Link>
          </div>
          <div className="navigation__container">
            <ul className="navigation__links">
              <li className="navigation__item">
                <Link to="/">Home</Link>
              </li>
              <li className="navigation__item">
                <Link to="/about">About</Link>
              </li>
              {genre.map((genreItem) => (
                <li className="navigation__item" key={genreItem}>
                  <Link to={`/genre/${genreItem}`}>{genreItem}</Link>
                </li>
              ))}
            </ul>
            <div className="nav-icons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="white"
                  d="M1024 779q51 0 95 19t78 53 52 77 20 96q0 51-19 95t-53 78-77 52-96 20q-51 0-95-19t-78-53-52-77-20-96q0-51 19-95t53-78 77-52 96-20m0 384q29 0 54-11t44-29 30-44 11-55-11-54-29-44-44-30-55-11-54 11-44 29-30 44-11 55 11 54 29 44 44 30 55 11m716-855q72 71 127 154t93 174 57 189 20 199q0 101-19 199t-58 189-93 174-127 154l-75-75q64-64 113-138t83-156 51-169 18-178q0-90-17-177t-51-170-83-156-114-138zM383 383q-64 64-113 138t-84 156-51 169-18 178q0 90 17 177t52 170 83 156 114 138l-75 75q-72-71-127-154t-93-174-57-189-20-199q0-101 19-199t58-189 93-174 127-154zm1086 196q89 90 136 204t48 241q0 126-47 240t-137 205l-75-75q74-74 113-169t40-201q0-105-39-200t-114-170zm-815 75q-74 74-113 169t-40 201q0 105 39 200t114 170l-75 75q-89-90-136-204t-48-241q0-126 47-240t137-205z"
                />
              </svg>
            </div>
            <Login />
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
