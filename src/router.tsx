import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const App = lazy(() => import("./App"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
]);
