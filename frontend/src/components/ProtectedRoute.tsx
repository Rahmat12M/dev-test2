import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/authContext/AuthContext";

function ProtectedRoute() {
  const pathnames: string[] = ["/login", "/register"];

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Weiterleitungen in Bezug auf eingeloggt.
   */
  useEffect(() => {
    if (isLoggedIn !== null && !isLoggedIn) 
      navigate("/login");
    else if (pathnames.includes(location.pathname)) 
      navigate("/books");
  }, [isLoggedIn, location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedRoute;
