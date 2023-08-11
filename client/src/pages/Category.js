import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addData, editData, deleteData } from "../apiUtils";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import AddProductPopup from "./AddProductPopup";
import styles from "./Category.module.css";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    setJewelry(
      allProducts.filter(
        (product) =>
          product.category === category.substring(0, category.length - 1)
      )
    );
  }, [category, allProducts]);

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
    //delete from cart
    let url = `http://localhost:3000/cart/product/${product.id}`;
    deleteData(url, product, setCartProducts, ["productId"], navigate);

    //delete from store
    try {
      url = `http://localhost:3000/store/${product.id}`;
      await deleteData(url, product, setAllProducts, ["id"], navigate);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addProductToStore = async (product) => {
    console.log(product);
    const description = product.description;
    const similarProduct = jewelry.find(
      (product) => product.description === description
    );

    let url;
    let updatedProduct;
    let newProduct;

    if (similarProduct) {
      updatedProduct = {
        ...similarProduct,
        quantity: similarProduct.quantity + 1,
      };
      url = `http://localhost:3000/store/${product.id}`;
      editData(url, updatedProduct, setAllProducts, "id", navigate);
    } else {
      newProduct = {
        productId: product.id,
        userId: user.id,
        quantity: 1,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      };
      url = `http://localhost:3000/store`;

      addData(url, newProduct, setAllProducts, navigate);
      console.log(jewelry);
      console.log(allProducts);
    }
  };

  const isManager = user.status === "admin";

  return (
    <div className={styles["category-container"]}>
      <h2 className={styles["category-heading"]}>{category}</h2>
      {isManager && (
        <button
          className={styles["add-button"]}
          onClick={() => setIsPopupOpen(true)}
        >
          Add {category}
        </button>
      )}
      <ul className={styles["category-list"]}>
        {jewelry.map((item) => (
          <li key={item.id} className={styles["category-item"]}>
            <img
              src={item.image}
              alt={item.description}
              className={styles["category-image"]}
            />
            <div className={styles["category-title"]}>{item.description}</div>
            <div>{item.price}$</div>
            <div>{item.quantity} left</div>
            <div className={styles["button-group"]}>
              {isManager && (
                <button
                  className={styles["delete-button"]}
                  onClick={() => deleteProductFromStore(item)}
                >
                  Delete
                </button>
              )}
              <button
                className={`${styles["add-to-cart-button"]} ${
                  item.quantity === 0 ? styles["disabled-button"] : ""
                }`}
                onClick={() => addToCart(item)}
                disabled={item.quantity === 0}
              >
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
      <AddProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddProduct={addProductToStore}
        category={category}
      />
    </div>
  );
}

export default Category;
