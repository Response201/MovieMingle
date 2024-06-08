import { Outlet } from "react-router-dom";

import  Navigation from "../components/navbar";

import { Navbar } from "../components/navbar";
import { Login } from "../components/login";




export const Layout = () => {
	return (
		<>
	
			<header>

			<Navigation />

				<Navbar />
				<Login />

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
