import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Map from "./parents/Map";
import Login from "./parents/Login";

import "./App.scss";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/map",
      element: <Map />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
