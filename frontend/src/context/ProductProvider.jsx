import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { productReducers } from "./productReducers";
import axios from "axios";
import { fetchMenusFromApi } from "../api";

const Product = createContext();
const ProductProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [productState, productDispatch] = useReducer(productReducers, {
    product: [],
    searchQuery: "",
    byProductType: "",
  });
  const API_URL = import.meta.env.VITE_SERVICE_URL;
  const fetchMenus = async () => {
    // console.log("product provider...");
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce-sumit.onrender.com/api/product"
      );
      setLoading(false);
      productState.product = data;
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenus();
  }, []);
  return (
    <Product.Provider
      value={{ productState, productDispatch, isLoading, fetchMenus }}
    >
      {children}
    </Product.Provider>
  );
};

export const ProductState = () => {
  return useContext(Product);
};
export default ProductProvider;
