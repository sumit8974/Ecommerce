import "./App.css";
import HomePage from "./pages/HomePage";
import MenusPage from "./pages/MenusPage";
import SingleItemPage from "./pages/SingleItemPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/menus" element={<MenusPage />} />
        <Route exact path="/singlemenu/:id" element={<SingleItemPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/orders" element={<OrdersPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
