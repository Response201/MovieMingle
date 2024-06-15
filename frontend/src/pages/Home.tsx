import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { FetchMovies } from "../services/FetchMovies";
import { MoviePresentation } from "../components/MoviePresentation";
import video from "../../video/ssvid.net - Running Up That Hill Vol 2 Scene  Stranger Things 4.mp4"
import "../scss/_home.scss";
import Footer from "../components/Footer";

export const Home = () => {
  /* Global Context => variablar går att nå i hela appen vid denna typ av import */
  const { allMovies, totalPage, setAllMovies, setTotalPage } =
    useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(5);

  const fetchMoviesData = async (page: number, size: number) => {
    const { movies, totalPages } = await FetchMovies(page, size);
    setAllMovies(movies);
    setTotalPage(totalPages);
  };

  /* make new fetch when page changes */
  useEffect(() => {
    fetchMoviesData(currentPage, size);
  }, [currentPage]);

  useEffect(() => {
    fetchMoviesData(1, size);
    setCurrentPage(1);
  }, [size]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moviesHtml = allMovies.map((movie) => (
    <MoviePresentation key={movie.id} movie={movie} />
  ));

  const scrollToMovies = () => {
    const moviesSection = document.getElementById("movies-arrow-down");
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="home-wrapper">
        <div className="video-container">
          <video className="video-container__video" autoPlay muted loop>
            <source
              src={video}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="video-container__content">
            <div className="video-container__title">Stranger Things</div>
            <div className="video-container__description">
              The story begins with the mysterious disappearance of a young boy
              named Will Byers. As his friends and family search for him, they
              encounter a strange girl with supernatural abilities who goes by
              the name Eleven. She has escaped from a secret government
              laboratory and reveals the existence of a parallel dimension
              called the Upside Down, which is inhabited by terrifying
              creatures. As the series progresses, the characters face
              increasingly dangerous threats from both the Upside Down and human
              adversaries.
            </div>
            <div className="video-container__buttons">
              <button className="video-container__button video-container__button--play">
                Play Now
              </button>
              <button className="video-container__button video-container__button--info">
                Info
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-icon" onClick={scrollToMovies}>
          <svg
            className="arrow-down"
            width="40px"
            height="40px"
            viewBox="0 -4.5 20 20"
            version="1.1"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>arrow_down [#000000338]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-220.000000, -6684.000000)"
                  fill="#ffffff"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                      id="arrow_down-[#000000338]"
                    >
                      {" "}
                    </path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="movie-container">
          <div className="pageSize">
            <p>Movies per page:</p>
            <div className="pageSize__container">
              <p
                className={"pageSize__button" + (size === 3 ? "-selected" : "")}
                onClick={() => setSize(3)}
              >
                3
              </p>
              <p
                className={"pageSize__button" + (size === 5 ? "-selected" : "")}
                onClick={() => setSize(5)}
              >
                5
              </p>
              <p
                className={"pageSize__button" + (size === 8 ? "-selected" : "")}
                onClick={() => setSize(8)}
              >
                8
              </p>
            </div>
          </div>
          <div id="movies-arrow-down"></div>

          <div className="movies">{moviesHtml}</div>

          <div className="page">
            <button
              className="page__button-previous"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="page__button-next"
              onClick={handleNextPage}
              disabled={currentPage === totalPage}
            >
              Next Page
            </button>
            <p>
              Page: {currentPage} of {totalPage}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
