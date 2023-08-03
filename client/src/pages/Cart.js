import { getData, addData, editData, deleteData } from "../apiUtils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let savedProducts = localStorage.getItem("cartProducts");
    if (!savedProducts) {
      const url = `http://localhost:3000/cart/${user.id}`;
      getData(url, setProducts, navigate);
      localStorage.setItem("cartProducts", JSON.stringify(products));
    } else {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Your cart</h2>
      <ul>
        {products.map((item) => (
          <li key={item.productId}>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
