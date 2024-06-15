
import axios from 'axios';



const FetchAllGenres = async () => {
   
    try {
        const response = await axios.get(
          `https://movie-mingle-server.vercel.app/genre`
        );

      
        return response.data;
      } catch (error) {
        console.log(error);
    
      }

}

export default FetchAllGenres
