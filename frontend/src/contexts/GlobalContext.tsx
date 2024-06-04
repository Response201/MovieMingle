import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { Movie } from "../model/movie";
interface ReservevationData {
	children?: false | ReactNode;
	cartItems: Movie[];
	setCartItems: Dispatch<SetStateAction<Movie[]>>;
	allMovies:Movie[]; 
	setAllMovies:Dispatch<SetStateAction<Movie[]>>;

}
interface Props {
	children: ReactNode;
}
export const GlobalContext = createContext<ReservevationData | undefined>(undefined);
export const GlobalProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<Movie[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
const [allMovies, setAllMovies] = useState<Movie[]>([])

	return (
		<GlobalContext.Provider
			value={{
				cartItems,
				setCartItems,
				allMovies, 
				setAllMovies
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
