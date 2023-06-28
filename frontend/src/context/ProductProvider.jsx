import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { productReducers } from "./productReducers";
import axios from "axios";

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
      const { data } = await axios.get(`${API_URL}/api/product`);
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
