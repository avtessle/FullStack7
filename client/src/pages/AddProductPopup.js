import React, { useState } from "react";

function AddProductPopup({ isOpen, onClose, onAddProduct, category }) {
  const [newProductData, setNewProductData] = useState({
    category: category.substring(0, category.length - 1), 
    description: "",
    price: 0,
    quantity: 0,
    image:""
  }) ;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    // Call the provided onAddProduct function with the productData
    onAddProduct(newProductData);
    // Clear the form and close the popup
    setNewProductData({
      category: category.substring(0, category.length - 1), 
    description: "",
    price: 0,
    quantity: 0,
    image:""
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        {/* Form to add product data */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProductData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProductData.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProductData.quantity}
          onChange={handleInputChange}
        />
         <input
          type="text"
          name="image"
          placeholder="Image"
          value={newProductData.image}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductPopup;
