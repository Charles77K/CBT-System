import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Rootstate } from "../store/store";

export default function MainLayout() {
  const isUserAuth = useSelector((state: Rootstate) => state.userAuth.isAuth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isUserAuth) navigate("/login", { replace: true });
  //   console.log(isUserAuth);
  // }, [isUserAuth, navigate]);

  return (
    <>
      {/* navbar */}
      <main>
        <Outlet />
      </main>
      {/* footer */}
    </>
  );
}
