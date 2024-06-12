import { Outlet } from "react-router-dom";



import  Navigation from "../components/navbar";
import { Login } from "../components/login";




export const Layout = () => {
	return (
		

		<>	
		<header>

			
	<Navigation />	
			
			</header>
	
			<main>
		
			
			
				<Outlet />
				
			</main>
			<footer className="layout-footer">
			<footer>
				<p>© 2021 MovieMingle</p>
			</footer>
			</footer>
			</>
			
		
	);
};
