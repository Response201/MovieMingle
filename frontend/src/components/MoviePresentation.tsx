import { useLocation, useNavigate } from "react-router-dom";
import { Movie } from "../model/movie";

interface IMovieProps {
  movie: Movie;
}

export const MoviePresentation = (props: IMovieProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      onClick={() => {
        navigate("/movie/" + props.movie.id);
        if (location.pathname === "/") {
          navigate("/movie/" + props.movie.id);
        }
      }}
      className="movie"
    >
      {location.pathname === "/movie/" + props.movie.id ? (
        <>
          <img
            className="movie__image-selected"
            src={props.movie.image}
            alt={props.movie.title}
          />
          <div className="movie__info-wrapper">
            <h3 className="movie__title-selected">{props.movie.title}</h3>
            <p className="movie__genre-selected">
              {props.movie.genre} | {props.movie.length} min
            </p>
            <p className="movie__description">{props.movie.description}</p>
            <button className="movie__button-rent">
              Rent: {props.movie.price} kr
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            className="movie__image"
            src={props.movie.image}
            alt={props.movie.title}
          />
          <h3 className="movie__title">{props.movie.title}</h3>
        </>
      )}
    </div>
  );
};

export default MoviePresentation;
