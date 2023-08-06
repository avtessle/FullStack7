import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, addData, editData, deleteData } from "../apiUtils";
import "./store.css";
import { useCart } from "../CartContext";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { cartProducts, setCartProducts } = useCart();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    let savedJewelry = localStorage.getItem(category);
    if (!savedJewelry) {
      const url = `http://localhost:3000/store/${category}`;
      getData(url, setJewelry, navigate);
    } else {
      setJewelry(JSON.parse(savedJewelry));
    }
  }, [category]);

  useEffect(() => {
    localStorage.setItem(category, JSON.stringify(jewelry));
  }, [category, jewelry]);

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
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
