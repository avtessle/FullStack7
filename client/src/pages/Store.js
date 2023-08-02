import { NavLink } from "react-router-dom";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";

function Store() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

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
