import axios from "axios";

const API_URL = import.meta.env.VITE_SERVICE_URL;

export async function fetchAllOrdersfromApi(config) {
  if (!config) {
    throw {
      message: "provide axios config",
    };
  }
  try {
    const { data } = await axios.get(`${API_URL}/api/order/admin`, config);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchMenusFromApi() {
  try {
    const { data } = await axios.get(`${API_URL}/api/product`);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProductById(id, config) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/product/delete`,
      { id },
      config
    );
    return data;
  } catch (err) {
    throw err;
  }
}

export async function buyProducts(orderData, config) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/order`,
      orderData,
      config
    );
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createProduct(formData, config) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/product/upload`,
      formData,
      config
    );
    return data;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(loginData, config) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/user/login`,
      loginData,
      config
    );
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createUser(newUserData, config) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/user`,
      newUserData,
      config
    );
    return data;
  } catch (err) {
    throw err;
  }
}
export async function getUserOrdersfromApi(config) {
  try {
    const { data } = await axios.get(`${API_URL}/api/order`, config);
    return data;
  } catch (err) {
    throw err;
  }
}
