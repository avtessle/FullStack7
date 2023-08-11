import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import { editData, deleteData, deleteAllData, addData } from "../apiUtils";
import styles from "./Cart.module.css";
import emptyCartImage from "../images/empty-cart.png";

function Cart({ soldProducts, setSoldProducts }) {
  const navigate = useNavigate();

  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();
  const [isCheckout, setIsCheckout] = useState(false);

  let user = JSON.parse(localStorage.getItem("currentUser"));
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("soldProducts", JSON.stringify(soldProducts));
  }, [soldProducts]);

  useEffect(() => {
    const soldOutOrNotEnough = cartProducts.some((item) => {
      const product = allProducts.find((prod) => prod.id === item.productId);
      return product.quantity === 0 || item.quantity > product.quantity;
    });

    setIsCheckout(soldOutOrNotEnough);
  }, [cartProducts, allProducts]);

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

    //add to soldProducts
    url = `http://localhost:3000/purchases/${user.id}`;
    cartProducts.forEach((product) => {
      addData(
        url,
        { ...product, purchaseId: user.purchases + 1 },
        setSoldProducts,
        navigate
      );
    });

    //update user purchases count
    url = `http://localhost:3000/purchases/${user.id}`;
    editData(
      url,
      { ...user, purchases: user.purchases + 1 },
      null,
      ["id"],
      navigate
    );
    user.purchases = user.purchases + 1;
    localStorage.setItem("currentUser", JSON.stringify(user));

    //delete all from cartProducts
    url = `http://localhost:3000/cart/user/${user.id}`;
    deleteAllData(url, setCartProducts, navigate);
  };

  return (
    <div className={styles["cart-container"]}>
      <h1 className={styles["cart-heading"]}>My Cart</h1>
      {cartProducts.length > 0 ? (
        <ul className={styles["cart-list"]}>
          {cartProducts.map((item) => {
            const product = allProducts.find(
              (prod) => prod.id === item.productId
            );
            const isSoldOut = product.quantity === 0;
            const notEnough = product.quantity < item.quantity;

            return (
              <li key={item.productId} className={styles["cart-item"]}>
                <div className={styles["cart-item-description"]}>
                  <img
                    src={item.image}
                    alt={item.description}
                    className={styles["cart-item-image"]}
                  />
                  <div>
                    <p>{item.description}</p>
                    <p>{item.price}$</p>
                    <p>Quantity: {item.quantity}</p>
                    {isSoldOut && <p>Sold Out</p>}
                    {notEnough && !isSoldOut && (
                      <p className={styles["sold-out"]}>
                        Cannot be purchased in this quantity
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className={styles["cart-item-remove"]}
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles["cart-empty"]}>
          <p>Your cart is empty...</p>
          <img src={emptyCartImage} />
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className={styles["checkout"]}>
          <h3 className={styles["cart-total"]}>
            Total: {parseFloat(totalPrice).toFixed(2)}$
          </h3>

          <button
            className={`${styles["checkout-button"]} ${
              isCheckout ? styles["disabled-button"] : ""
            }`}
            onClick={checkout}
            disabled={isCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
