import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext/AuthContext";

function Header() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <>
      <nav className={`${styles["nav"]}`}>
        {isLoggedIn && (
          <>
            <NavLink
              to={"/books"}
              className={({ isActive }) =>
                `${isActive ? styles.activ : ""} ${styles.navLink}`
              }
            >
              Your local library
            </NavLink>
            <NavLink
              to={"/manage"}
              className={({ isActive }) =>
                `${isActive ? styles.activ : ""} ${styles.navLink}`
              }
            >
              Manage Books
            </NavLink>{" "}
            <div style={{ marginLeft: 40}}>
              <span style={{ marginRight: 10, fontSize: "1rem" }}>
                Welcome {username}
              </span>
              <NavLink
                to={"/logout"}
                className={({ isActive }) =>
                  `${isActive ? styles.activ : ""} ${styles.navLink}  button`
                }
              >
                Logout
              </NavLink>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `${isActive ? styles.activ : ""} ${styles.navLink}`
              }
            >
              Login
            </NavLink>

            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                `${isActive ? styles.activ : ""} ${styles.navLink}`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Header;
