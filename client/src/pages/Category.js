import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addData, editData } from "../apiUtils";
import "./store.css";
import { useCart } from "../CartContext";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { cartProducts, setCartProducts } = useCart();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    setJewelry(
      allProducts.filter(
        (product) =>
          product.category === category.substring(0, category.length - 1)
      )
    );
  }, [category]);

  const addToCart = (product) => {
    const description = product.description;
    const similarProduct = cartProducts.find(
      (product) => product.description === description
    );

    const url = `http://localhost:3000/cart/${user.id}`;
    let updatedProduct;

    if (similarProduct) {
      updatedProduct = {
        ...similarProduct,
        quantity: similarProduct.quantity + 1,
      };

      const inStoreProduct = jewelry.find(
        (product) => product.description === description
      );
      if (updatedProduct.quantity > inStoreProduct.quantity) {
        alert("You have already reached the maximum amount!");
      } else {
        editData(url, updatedProduct, setCartProducts, "productId", navigate);
      }
    } else {
      updatedProduct = {
        productId: product.id,
        userId: user.id,
        quantity: 1,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      };

      addData(url, updatedProduct, setCartProducts, navigate);
    }
  };

  const deleteProductFromStore = (productId) => {
    // Update storeProducts state by filtering out the deleted product
    //const updatedProducts = storeProducts.filter(product => product.id !== productId);
    //setStoreProducts(updatedProducts);
    return productId;
  };

  const isManager = user.status === "admin";

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {jewelry.map((item) => (
          <li key={item.id}>
            <p>
              <img src={item.image} alt={item.description} />
            </p>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            <p>{item.quantity} left</p>
            {isManager && (
              <button onClick={() => deleteProductFromStore(item.id)}>
                Delete
              </button>
            )}
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
