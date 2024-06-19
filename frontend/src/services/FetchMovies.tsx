import axios from "axios";
import { Movie } from "../model/movie";
interface Data {
  movies: Movie[];
  totalPages: number;
}

export const FetchMovies = async (page: number, size: number) => {
  try {
    const response = await axios.get<Data>(
      `https://movie-mingle-server.vercel.app/all?page=${page}&pageSize=${size}`
    );
    const { movies, totalPages } = response.data;
    return { movies, totalPages };
  } catch (error) {
    console.log(error);
    return { movies: [], totalPages: 0 };
  }
};
