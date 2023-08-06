import { useEffect } from "react";
import { useCart } from "../CartContext";

function Cart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { cartProducts, setCartProducts } = useCart();
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // useEffect(() => {
  //   let savedProducts = JSON.parse(localStorage.getItem("cartProducts"));
  //   if (savedProducts.length === 0) {
  //     const url = `http://localhost:3000/cart/${user.id}`;
  //     getData(url, setCartProducts, navigate);
  //   } else {
  //     setCartProducts(savedProducts);
  //   }
  // }, []);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Your cart</h2>
      <ul>
        {cartProducts.map((item) => (
          <li key={item.productId}>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
