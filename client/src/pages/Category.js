import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addData, editData } from "../apiUtils";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import AddProductPopup from "./AddProductPopup";
import styles from "./Category.module.css";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  //const categories = ["necklaces", "earrings", "bracelets", "rings"];

  // useEffect(() => {
  //   if (!categories.includes(category)) {
  //     navigate("/error");
  //   }
  // }, [category, categories, navigate]);

  const { cartProducts, setCartProducts } = useCart();
  const { allProducts, setAllProducts } = useProducts();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jewelry, setJewelry] = useState([]);
  const [popupMode, setPopupMode] = useState("");
  const [editProductData, setEditProductData] = useState(null);

  const user = JSON.parse(localStorage.getItem("currentUser"));

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
    const url = `http://localhost:3000/cart/${user.id}`;
    let updatedProduct;

    //search product in cart
    const productId = product.id;
    const similarProduct = cartProducts.find(
      (product) => product.productId === productId
    );

    //already exists in cart: quantity + 1
    if (similarProduct) {
      updatedProduct = {
        ...similarProduct,
        quantity: similarProduct.quantity + 1,
      };

      //if quantity is more than available
      const inStoreProduct = jewelry.find(
        (product) => product.id === productId
      );
      if (updatedProduct.quantity > inStoreProduct.quantity) {
        alert("You have already reached the maximum amount!");
      } else {
        editData(url, updatedProduct, setCartProducts, "productId", navigate);
      }
    } else {
      //not in cart- add as new product
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
    //quantity=0 in store
    try {
      let url = `http://localhost:3000/store`;
      await editData(
        url,
        { ...product, quantity: 0 },
        setAllProducts,
        "id",
        navigate
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addProductToStore = async (product) => {
    const similarProduct = jewelry.find((p) => p.id === product.id);

    if (similarProduct) {
      //product already exists
      alert("This product already exists!");
    } else {
      const url = `http://localhost:3000/store`;
      addData(url, product, setAllProducts, navigate);
    }
  };

  const EditProductInStore = async (product) => {
    let url = `http://localhost:3000/store/manager`;
    editData(url, product, setAllProducts, "id", navigate);
  };

  const isManager = user.status === "admin";

  return (
    <div className={styles["category-container"]}>
      <h2 className={styles["category-heading"]}>{category}</h2>
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
            <div>
              {item.quantity === 0 ? "Sold Out" : `${item.quantity} left`}
            </div>
            <div className={styles["button-group"]}>
              {isManager && (
                <div className={styles["manager-buttons"]}>
                  <button onClick={() => deleteProductFromStore(item)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setPopupMode("edit");
                      setEditProductData(item);
                      setIsPopupOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
              {!isManager && (
                <button
                  className={`${styles["add-to-cart-button"]} ${
                    item.quantity === 0 ? styles["disabled-button"] : ""
                  }`}
                  onClick={() => addToCart(item)}
                  disabled={item.quantity === 0}
                >
                  Add to cart
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {isManager && (
        <button
          className={styles["add-button"]}
          onClick={() => {
            setPopupMode("add");
            setIsPopupOpen(true);
          }}
        >
          Add {category}
        </button>
      )}
      <AddProductPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setEditProductData(null);
        }}
        onAddProduct={addProductToStore}
        onEditProduct={EditProductInStore}
        category={category}
        popupMode={popupMode}
        editProductData={editProductData}
      />
    </div>
  );
}

export default Category;
