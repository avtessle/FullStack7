import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const name = JSON.parse(localStorage.getItem("currentUser")).username;
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/login" className={styles.link}>
          Logout
        </NavLink>
        <br />
        <NavLink to={`/store`} className={styles.link}>
          Store
        </NavLink>
        <br />
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;