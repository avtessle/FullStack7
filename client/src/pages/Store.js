import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import { useEffect } from "react";
import { getData } from "../apiUtils";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";

function Store() {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    let savedProducts = localStorage.getItem("allProducts");
    if (!savedProducts) {
      const url = `http://localhost:3000/store`;
      getData(url, setAllProducts, navigate);
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }

    let savedCartProducts = localStorage.getItem("cartProducts");
    if (!savedCartProducts) {
      const url = `http://localhost:3000/cart/${user.id}`;
      getData(url, setCartProducts, navigate);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const isManager = user.status === "admin";

  return (
    <div className="store-container">
      <h1 className="welcome-message">Hello, {user.name}!</h1>
      <div className="category-links">
        <NavLink to="/store/necklaces" className="category-link">
          <p className="category-title">Necklaces</p>
          <img src={necklacesImage} alt="necklaces" className="category-image" />
        </NavLink>
        <NavLink to="/store/rings" className="category-link">
          <p className="category-title">Rings</p>
          <img src={ringsImage} alt="rings" className="category-image" />
        </NavLink>
      </div>
    </div>
  );
}

export default Store;
