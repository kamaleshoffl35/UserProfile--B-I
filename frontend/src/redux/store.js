import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice"
import unitReducer from "./unitSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    units:unitReducer,
  },
});
