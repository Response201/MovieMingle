import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";





export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <Home />,
				index: true,
			},	{
				path: "/movies",
				element:<Movies /> ,
				index: true,
			},
			
		],
	},
]);
