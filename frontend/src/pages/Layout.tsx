import { Outlet } from "react-router-dom";
import  Navigation from "../components/navbar";



export const Layout = () => {
	return (
		<>
	
			<header>
			<Navigation />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
			<h2>Footer</h2>
			</footer>
		</>
	);
};
