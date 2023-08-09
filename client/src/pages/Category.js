import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addData, editData, deleteData } from "../apiUtils";
import "./Category.css";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContex";
import AddProductPopup from "./AddProductPopup";


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
    console.log("Category effect triggered");
    console.log("Category:", category);
    console.log("All Products:", allProducts);
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

    try {
      const url = `http://localhost:3000/store/${product.id}`;
      await deleteData(url, product, setAllProducts, ["id"], navigate);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

 /*  const addProductToStore = async (product) => {
    console.log(product);
    const description = product.description;
    const similarProduct = jewelry.find(
      (product) => product.description === description
    );

    let url; 
    let updatedProduct;
    let newProduct ;

    if (similarProduct) {
      updatedProduct = {
        ...similarProduct,
        quantity: similarProduct.quantity + 1,
      };
      url = `http://localhost:3000/store/${product.id}`;
      editData(url, updatedProduct, setAllProducts, "id", navigate);
    }
   
    else {
      newProduct = {
        productId: product.id,
        userId: user.id,
        quantity: 1,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      };
      url = `http://localhost:3000/store/${product}`;

      addData(url, newProduct, setAllProducts, navigate);
    }
 
  }; */

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
    <div className="category-container">
      <h2 className="category-heading">{category}</h2>
      {isManager && (
        <button
          className="add-button"
          onClick={() => setIsPopupOpen(true)}
        >
          Add {category}
        </button>
      )}
      <ul className="category-list">
        {jewelry.map((item) => (
          <li key={item.id} className="category-item">
            <img
              src={item.image}
              alt={item.description}
              className="category-image"
            />
            <p className="category-title">{item.description}</p>
            <p>Price: {item.price}</p>
            <p>{item.quantity} left</p>
            <div className="button-group">
              {isManager && (
                <button
                  className="delete-button"
                  onClick={() => deleteProductFromStore(item)}
                >
                  Delete
                </button>
              )}
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(item)}
              >
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* {isManager && (
            <button
              className="add-button"
              onClick={() => addProductToStore()}
            >
              Add {Category}
            </button>
          )} */}
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
