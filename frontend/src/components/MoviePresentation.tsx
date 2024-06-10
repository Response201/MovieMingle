import { useNavigate } from "react-router-dom";
import { Movie } from "../model/movie";

interface IMovieProps {
  movie: Movie;
}

export const MoviePresentation = (props: IMovieProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/movie/" + props.movie.id);
      }}
      className="movie"
    >
      <h3 className="movie__title">{props.movie.title}</h3>
      <img className="movie__image" src={props.movie.image}></img>
    </div>
    //if loggedin => show buyButton
  );
};
