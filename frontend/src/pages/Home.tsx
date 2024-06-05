import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { FetchMovies } from "../functions/FetchMovies";
export const Home =  () => {
	/* Global Context => variablar går att nå i hela appen vid denna typ av import */
	const { allMovies, totalPage, setAllMovies, setTotalPage } = useGlobalContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [size, setSize] = useState(5);

	
    const fetchMoviesData = async (page: number, size: number) => {
        const { movies, totalPages } = await FetchMovies(page, size);
        setAllMovies(movies);
        setTotalPage(totalPages);
    };

	/* make new fetch when page changes */
	useEffect(() => {
		fetchMoviesData(currentPage, size);
	}, [currentPage, size]);


	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPage) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<>
			<h1>Home!</h1>
			<button onClick={()=>setSize(3)}> 3 </button><button onClick={()=>setSize(5)}> 5 </button><button onClick={()=>setSize(8)}> 8 </button>
			{allMovies.map((movie) => (
				<div key={movie.id}>{movie.title}</div>
			))}

			<button onClick={handlePrevPage} disabled={currentPage === 1}>
				Previous Page
			</button>
			<button onClick={handleNextPage} disabled={currentPage === totalPage}>
				Next Page
			</button>

			<p> {currentPage}/{totalPage}</p>
		</>
	);
};
