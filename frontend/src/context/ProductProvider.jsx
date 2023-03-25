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
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/product");
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
    <Product.Provider value={{ productState, productDispatch, isLoading }}>
      {children}
    </Product.Provider>
  );
};

export const ProductState = () => {
  return useContext(Product);
};
export default ProductProvider;
