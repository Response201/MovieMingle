import axios from "axios";
import { Movie } from "../model/movie";

export const FetchMovie = async (id: number) => {
  try {
    const response = await axios.get<Movie>(
      `https://movie-mingle-server.vercel.app/api/v1/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
