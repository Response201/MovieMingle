import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";



export const Layout = () => {
	return (
		<>
			<header>
			<Navbar />
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
