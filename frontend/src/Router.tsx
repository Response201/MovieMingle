import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { OneMovie } from "./pages/OneMovie";
import { About } from "./pages/About";
import { GenrePage } from "./pages/GenrePage";

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
      },
      {
        path: "/about",
        element: <About />,
        index: true,
      },
      {
        path: "/genre/:genreItem",
        element: <GenrePage />,
        index: true,
      },
      {
        path: "/movie/:movieId",
        element: <OneMovie />,
        index: true,
      },

    ],
  },
]);
