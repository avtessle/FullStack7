import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import { editData, deleteData, deleteAllData } from "../apiUtils";

function Cart() {
  const navigate = useNavigate();

  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

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
        product,
        setCartProducts,
        ["productId", "userId"],
        navigate
      );
    }
  };

  const checkout = () => {
    //quantity-=1 in allProducts
    let url = `http://localhost:3000/store`;
    const cartProductIds = new Set(
      cartProducts.map((product) => product.productId)
    );

    allProducts.forEach((product) => {
      if (cartProductIds.has(product.id)) {
        const cartProduct = cartProducts.find(
          (cartProduct) => cartProduct.productId === product.id
        );

        const updatedQuantity = product.quantity - cartProduct.quantity;

        editData(
          url,
          { ...product, quantity: updatedQuantity },
          setAllProducts,
          "id",
          navigate
        );
      }
    });

    //delete all from cartProducts
    url = `http://localhost:3000/cart/${user.id}`;
    deleteAllData(url, setCartProducts, navigate);
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
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: {parseFloat(totalPrice).toFixed(2)}</h3>
      <button onClick={checkout}>checkout</button>
    </div>
  );
}

export default Cart;
