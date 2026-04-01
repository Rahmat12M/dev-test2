import { AuthContext } from "@/contexts/authContext/AuthContext";
import { useContext, useEffect } from "react";

function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    console.log('In Logout');
    logout();
  }, []);

  return (
    <>
    </>
  );
}

export default Logout;