import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Navbar";
import Error from "./pages/Error";
import Store from "./pages/Store";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import { CartProvider } from "./CartContext";

function App() {
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentName(JSON.parse(user).name);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="login"
              element={<Login setCurrentName={setCurrentName} />}
            />
            <Route
              path="register"
              element={<Register setCurrentName={setCurrentName} />}
            />

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
                    <Store />
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
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
