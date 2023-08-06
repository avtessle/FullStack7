import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";
import { getData } from "../apiUtils";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";

function Store() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { cartProducts, setCartProducts } = useCart();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    const url = `http://localhost:3000/cart/${user.id}`;
    getData(url, setCartProducts, navigate);
  }, [user]);

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
