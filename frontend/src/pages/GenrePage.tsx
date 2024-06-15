import { Movie } from "../model/movie";
import { FetchGenre } from "../services/FetchGenre";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoviePresentation from "../components/MoviePresentation";

export const GenrePage = () => {
  const { genreItem } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const fetchedMovies = await FetchGenre(genreItem || "");
        if (fetchedMovies) {
          setMovies(fetchedMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesByGenre();
  }, [genreItem]);

  return (
    <div className="GenreWrapper">
      <section className="GenrePageContainer">
       {movies && <h1>{genreItem}</h1>}
        <section className="movies">
          {movies.map((movie) => (
            <MoviePresentation key={movie.id} movie={movie} />
          ))}
        </section>
      </section>
    </div>
  );
};
