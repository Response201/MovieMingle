
import axios from 'axios';



const FetchAllGenres = async () => {
   
    try {
        const response = await axios.get(
          `http://localhost:3000/genre`
        );

      
        return response.data;
      } catch (error) {
        console.log(error);
    
      }

}

export default FetchAllGenres
