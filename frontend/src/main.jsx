import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./context/UserProvider";
import { BrowserRouter, Routes } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ProductProvider>
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </ProductProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
