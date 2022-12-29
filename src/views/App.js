import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Home from "./parents/Home";
import Login from "./components/home/Login";
import LoginSuccess from "./components/user/LoginSuccess";
import Regist from "./components/user/Regist";

import OAuthKakao from "./components/home/oauth/OAuthKakao";

import Map from "./parents/Map";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/success",
          element: <LoginSuccess />,
        },
        {
          path: "/regist",
          element: <Regist />,
        },
      ],
    },
    {
      path: "/oauth",
      children: [
        {
          path: "/oauth/kakao",
          element: <OAuthKakao />,
        },
      ],
    },
    {
      path: "/map",
      element: <Map />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
