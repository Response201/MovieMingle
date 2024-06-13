import axios from "axios";
import { Movie } from "../model/movie";

export const FetchMovie = async (id: number) => {
  try {
    const response = await axios.get<Movie>(
      `http://localhost:3000/api/v1/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
