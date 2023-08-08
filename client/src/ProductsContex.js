import React, { createContext, useContext, useState } from "react";
const ProductsContex = createContext();

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  return (
    <ProductsContex.Provider value={{ allProducts, setAllProducts }}>
      {children}
    </ProductsContex.Provider>
  );
};

export const useProducts = () => useContext(ProductsContex);
