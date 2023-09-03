import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./context/UserProvider";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ProductProvider>
        <BrowserRouter>
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </BrowserRouter>
      </ProductProvider>
    </ChakraProvider>
  </React.StrictMode>
);
