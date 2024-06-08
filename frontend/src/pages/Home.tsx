
import { useGlobalContext } from "../contexts/GlobalContext";
import axios from "axios";
import { Movie } from "../model/movie";
import '../scss/_home.scss';

export const Home = () => {
	/* Global Context => variablar går att nå i hela appen vid denna typ av import */
	const {  allMovies, setAllMovies } = useGlobalContext();



	if (allMovies.length <= 0) {
		axios
			.get<Movie[]>("http://localhost:3000/all")
			.then(function (response) {
				setAllMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<> 


			{allMovies.map((item) => {
				return <p key={item.id}>{item.title}</p>;
			})}
			
		
		</>
	);
};
