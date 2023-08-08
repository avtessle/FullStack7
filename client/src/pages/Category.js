import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addData, editData, deleteData } from "../apiUtils";
import "./Category.css";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { cartProducts, setCartProducts } = useCart();
  const { products, setProducts } = useProducts();

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

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [products]);

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



  const deleteProductFromStore = async (product) => {
    try {
      const url = `http://localhost:3000/store/${product.id}`;
      await deleteData(url, product, setProducts, "id", navigate);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const isManager = user.status === "admin";

  return (
    <div className="category-container">
      <h2 className="category-heading">{category}</h2>
      <ul className="category-list">
        {jewelry.map((item) => (
          <li key={item.id} className="category-item">
            <img src={item.image} alt={item.description} className="category-image" />
            <p className="category-title">{item.description}</p>
            <p>Price: {item.price}</p>
            <p>{item.quantity} left</p>
            <div className="button-group">
              {isManager && (
                <button className="delete-button" onClick={() => deleteProductFromStore(item)}>
                  Delete
                </button>
              )}
              <button className="add-to-cart-button" onClick={() => addToCart(item)}>
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Category;
