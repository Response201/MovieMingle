import axios from "axios";

export const FetchMovies = async (page: number, size: number) => {
  try {
    const response = await axios.get(
      `https://movie-mingle-server.vercel.app/all?page=${page}&pageSize=${size}`
    );
    const { movies, totalPages } = response.data;
    return { movies, totalPages };
  } catch (error) {
    console.log(error);
    return { movies: [], totalPages: 0 };
  }
};
