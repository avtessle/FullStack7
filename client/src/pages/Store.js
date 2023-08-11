import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import { useEffect } from "react";
import { getData } from "../apiUtils";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";
import styles from "./Store.module.css";
// import "./Store.css";

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

  return (
    <div className={styles["store-container"]}>
      <div className={styles["our-story"]}>
        <h1>Our Story</h1>
        <p>
          Here we aim to bring precious human bonding into our jewelry,
          delivering a compelling message of love, friendship, and empowerment.
          Our products speak the unspoken words to your loved ones, reminding
          them of the sacred inner strength each person carries within
          themselves. we believe that quality jewellery shouldn’t be expensive,
          must be 100% hypoallergenic, and that every woman should have access
          to the perfect piece to elevate any look.
        </p>
      </div>
      <div className={styles["category-links"]}>
        <NavLink to="/store/necklaces" className={styles["category-link"]}>
          <div className={styles["category-title"]}>Necklaces</div>
          <img
            src={necklacesImage}
            alt="necklaces"
            className={styles["category-image"]}
          />
        </NavLink>
        <NavLink to="/store/rings" className={styles["category-link"]}>
          <div className={styles["category-title"]}>Rings</div>
          <img
            src={ringsImage}
            alt="rings"
            className={styles["category-image"]}
          />
        </NavLink>
        <NavLink to="/store/earrings" className={styles["category-link"]}>
          <div className={styles["category-title"]}>Earrings</div>
          <img
            src="https://ph.pennypairs.com/cdn/shop/products/Amelie-Gold-Earrings-Huggies_1600x.jpg?v=1652925868"
            alt="earrings"
            className={styles["category-image"]}
          />
        </NavLink>
        <NavLink to="/store/bracelet" className={styles["category-link"]}>
          <div className={styles["category-title"]}>Bracelets</div>
          <img
            src="https://kinclimg5.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BIMA0780V40-POSTER-56139.jpg"
            alt="bracelet"
            className={styles["category-image"]}
          />
        </NavLink>
      </div>
    </div>
  );
}
export default Store;
