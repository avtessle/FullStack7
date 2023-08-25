import React, { useState, useEffect } from "react";
import styles from "./AddProductPopup.module.css";

function AddProductPopup({
  isOpen,
  onClose,
  onAddProduct,
  onEditProduct,
  category,
  popupMode,
  editProductData,
}) {
  const initialProductData = {
    category: category.substring(0, category.length - 1),
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  };

  const [newProductData, setNewProductData] = useState(initialProductData);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (popupMode === "edit" && editProductData) {
      setNewProductData(editProductData);
    } else {
      setNewProductData(initialProductData);
    }
  }, [popupMode, editProductData]);

  useEffect(() => {
    setIsFormValid(
      newProductData.description !== "" &&
        newProductData.price !== "" &&
        newProductData.quantity !== "" &&
        newProductData.image !== ""
    );
  }, [newProductData, popupMode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductAction = () => {
    if (popupMode === "add") {
      onAddProduct(newProductData);
    } else {
      onEditProduct(newProductData);
    }

    // Clear the form and close the popup
    setNewProductData(initialProductData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles.popup}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProductData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={popupMode === "edit" ? newProductData.price : null}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={popupMode === "edit" ? newProductData.quantity : null}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          value={newProductData.image}
          onChange={handleInputChange}
        />
        {!isFormValid && (
          <div className={styles.errorMessage}>
            Please fill out all required fields!
          </div>
        )}
        <button onClick={handleProductAction} disabled={!isFormValid}>
          {popupMode === "add" ? "Add Product" : "Edit Product"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductPopup;
