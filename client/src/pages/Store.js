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

  const isManager = user.status === "manager";

  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <div>
        <NavLink to="/store/necklaces">
          <p>Necklaces</p>
          <img src={necklacesImage} alt="necklaces image" />
        </NavLink>
        <NavLink to="/store/rings">
          <p>Rings</p>
          <img src={ringsImage} alt="rings image" />
        </NavLink>
      </div>
    </div>
  );
}

export default Store;
