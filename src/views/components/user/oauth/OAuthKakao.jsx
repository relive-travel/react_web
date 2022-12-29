import { useEffect } from "react";
import { Navigate } from "react-router";

function OAuthKakao() {
  useEffect(() => {
    return () =>
      window.history.replaceState({}, null, window.location.pathname);
  }, []);

  return (
    <Navigate
      to="/"
      state={{
        code: new URL(window.location.href).searchParams.get("code"),
      }}
    />
  );
}

export default OAuthKakao;
