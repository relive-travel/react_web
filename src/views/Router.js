import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import OAuthKakao from "./components/home/oauth/OAuthKakao";

const Home = lazy(() => import("./parents/Home"));
const Login = lazy(() => import("./components/home/Login"));
const LoginSuccess = lazy(() => import("./components/home/LoginSuccess"));
const Regist = lazy(() => import("./components/home/Regist"));

const Map = lazy(() => import("./parents/Map"));

function Router() {
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

  return (
    <Suspense fallback={<div>loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Router;
