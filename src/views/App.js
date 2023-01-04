import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useLoginInterval from "hooks/useLoginInterval";

import Home from "./parents/Home";
import Login from "./components/home/Login";
import LoginSuccess from "./components/home/LoginSuccess";
import Regist from "./components/home/Regist";

import OAuthKakao from "./components/home/oauth/OAuthKakao";

import Map from "./parents/Map";

function App() {
  useLoginInterval(process.env.REACT_APP_INTERVAL_TIME);

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
