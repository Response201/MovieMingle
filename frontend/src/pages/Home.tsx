import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { FetchMovies } from "../functions/FetchMovies";
import { MoviePresentation } from "../components/MoviePresentation";
import axios from "axios";
import { Movie } from "../model/movie";

import "../scss/_home.scss";

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
  }, [currentPage, size]);

  console.log(fetchMoviesData);

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

  let moviesHtml = allMovies.map((movie) => (
    <MoviePresentation key={movie.id} movie={movie} />
  ));

  return (
    <>
      <div className="home-wrapper">
        <div className="video-container">
          <video className="video-container__video" autoPlay muted loop>
            <source
              src="/video/ssvid.net - Running Up That Hill Vol 2 Scene  Stranger Things 4.mp4"
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

        <div className="movie-container">
          {allMovies.map((item) => {
            return <p key={item.id}>{item.title}</p>;
          })}

          <h1>Home!</h1>
          <button onClick={() => setSize(3)}> 3 </button>
          <button onClick={() => setSize(5)}> 5 </button>
          <button onClick={() => setSize(8)}> 8 </button>
          <div className="movies">{moviesHtml}</div>

          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPage}>
            Next Page
          </button>

          <p>
            {" "}
            {currentPage}/{totalPage}
          </p>
        </div>
      </div>
    </>
  );
};
