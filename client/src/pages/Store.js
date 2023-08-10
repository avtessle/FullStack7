import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import { useEffect } from "react";
import { getData } from "../apiUtils";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";
import styles from "./Store.module.css";

function Store({ soldProducts, setSoldProducts }) {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async (url, setData, storageKey) => {
      const savedData = localStorage.getItem(storageKey);

      if (!savedData) {
        const data = await getData(url, setData, navigate);
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    };

    fetchData(`http://localhost:3000/store`, setAllProducts, "allProducts");
    fetchData(
      `http://localhost:3000/cart/${user.id}`,
      setCartProducts,
      "cartProducts"
    );
    fetchData(
      `http://localhost:3000/purchases/${user.id}`,
      setSoldProducts,
      "soldProducts"
    );
  }, [user.id]);

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("soldProducts", JSON.stringify(soldProducts));
  }, [soldProducts]);

  const isManager = user.status === "admin";

  return (
    <div className={styles["store-container"]}>
      <h1 className={styles["welcome-message"]}>Hello, {user.name}!</h1>
      <div className={styles["category-links"]}>
        <NavLink to="/store/necklaces" className={styles["category-link"]}>
          <p className={styles["category-title"]}>Necklaces</p>
          <img
            src={necklacesImage}
            alt="necklaces"
            className={styles["category-image"]}
          />
        </NavLink>
        <NavLink to="/store/rings" className={styles["category-link"]}>
          <p className={styles["category-title"]}>Rings</p>
          <img
            src={ringsImage}
            alt="rings"
            className={styles["category-image"]}
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Store;
