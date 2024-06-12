import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { Movie } from "../model/movie";
import Cookies from 'js-cookie';

interface ReservevationData {
	children?: false | ReactNode;
	cartItems: Movie[];
	setCartItems: Dispatch<SetStateAction<Movie[]>>;
	allMovies:Movie[]; 
	setAllMovies:Dispatch<SetStateAction<Movie[]>>;
	totalPage:number; 
	setTotalPage:Dispatch<SetStateAction<number>>;
	userSignedIn: string;
	setUserSignedIn: Dispatch<SetStateAction<string>>;
	genre: string[];
	setGenre: Dispatch<SetStateAction<string[]>>;
}
interface Props {
	children: ReactNode;
}
export const GlobalContext = createContext<ReservevationData | undefined>(undefined);
export const GlobalProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<Movie[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
	const [userSignedIn, setUserSignedIn] = useState(Cookies.get('jwtToken') || "");
	const [allMovies, setAllMovies] = useState<Movie[]>([]);
const [totalPage, setTotalPage] = useState(0);
const [genre, setGenre] = useState<string[]>([])

	return (
		<GlobalContext.Provider
			value={{
				cartItems,
				setCartItems,
				allMovies, 
				setAllMovies, totalPage, setTotalPage,
				userSignedIn,
				setUserSignedIn,
				genre, 
				setGenre
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export const useGlobalContext = (): ReservevationData => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useProductListContext must be used within a ProductListProvider");
	}
	return context;
};



