import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import cartImage from "./images/cart.png";
import profileImage from "./images/profile.png";

function Navbar() {
  //const name = JSON.parse(localStorage.getItem("currentUser")).name;
  const categories = ["necklaces", "earrings", "bracelets", "rings"];
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/login" className={styles.link}>
          Logout
        </NavLink>
        <NavLink to={`/store`} className={styles.link}>
          Store
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category}
            to={`/store/${category}`}
            className={styles.link}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </NavLink>
        ))}
        <NavLink to="/profile">
          <img
            src={profileImage}
            alt="profile image"
            className={styles.iconImage}
          />
        </NavLink>
        <NavLink to="/cart">
          <img src={cartImage} alt="cart image" className={styles.iconImage} />
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
