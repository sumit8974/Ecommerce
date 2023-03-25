export const productReducers = (state, action) => {
  switch (action.type) {
    case "SEARCH_FILTER":
      return { ...state, searchQuery: action.payload };
    case "BY_PRODUCT_TYPE":
      return { ...state, byProductType: action.payload };
    case "CLEAR_FILTERS":
      return { ...state, byProductType: "" };
    default:
      return state;
  }
};
