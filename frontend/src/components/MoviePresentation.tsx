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
          navigate("/movie/" + props.movie.id); //kolla om det funkar
        }
      }}
      className="movie"
    >
      {/* <div
        className="movie__image"
        style={{ backgroundImage: `url(${props.movie.image})` }}
      ></div> */}

      <img className="movie__image" src={props.movie.image}></img>
      <h3 className="movie__title">{props.movie.title}</h3>
      <p className="movie__genre">{props.movie.genre.join(", ")}</p>
    </div>
  );
};
