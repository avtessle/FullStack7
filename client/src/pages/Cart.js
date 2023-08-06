import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { editData, deleteData } from "../apiUtils";

function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { cartProducts, setCartProducts } = useCart();

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const removeFromCart = (product) => {
    let url = `http://localhost:3000/cart/${user.id}`;

    if (product.quantity > 1) {
      let updatedProduct = {
        ...product,
        quantity: product.quantity - 1,
      };
      editData(url, updatedProduct, setCartProducts, "productId", navigate);
    } else {
      url = `http://localhost:3000/cart/${user.id}/${product.productId}`;
      deleteData(
        url,
        [product.productId, product.userId],
        setCartProducts,
        ["productId", "userId"],
        navigate
      );
    }
  };

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
            <button on onClick={() => removeFromCart(item)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
