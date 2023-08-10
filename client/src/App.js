import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Navbar";
import Error from "./pages/Error";
import Store from "./pages/Store";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { CartProvider } from "./CartContext";
import { ProductsProvider } from "./ProductsContex";

function App() {
  const [soldProducts, setSoldProducts] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navbar />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="store"
                  element={
                    <ProtectedRoute>
                      <Store
                        soldProducts={soldProducts}
                        setSoldProducts={setSoldProducts}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="store/:category"
                  element={
                    <ProtectedRoute>
                      <Category />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute>
                      <Cart
                        soldProducts={soldProducts}
                        setSoldProducts={setSoldProducts}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile soldProducts={soldProducts} />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
