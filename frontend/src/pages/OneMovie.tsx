import { MoviePresentation } from "../components/MoviePresentation";
import { FetchMovie } from "../functions/FetchMovie";
import { Movie } from "../model/movie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OneMovie = () => {
  const [movie, setMovie] = useState<Movie>();

  const { movieId } = useParams();
  const id = movieId ? +movieId : 0;

  useEffect(() => {
    const getData = async () => {
      const movieData = await FetchMovie(id);
      if (movieData !== null) {
        setMovie(movieData);
      }
    };

    getData();
  }, [id]);

  return movie ? <MoviePresentation movie={movie} /> : null;
};
