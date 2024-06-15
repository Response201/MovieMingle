import { Movie } from '../model/movie';
import axios from 'axios';




export const FetchGenre = async (genre:string) => {
    try {
        const response = await axios.get<Movie[]>(
          `https://movie-mingle-server.vercel.app/api/genre/${genre}`
        );



        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
}


