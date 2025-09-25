import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice"
import unitReducer from "./unitSlice"
import taxReducer from "./taxSlice"
import customerReducer from "./customerSlice"
import supplierReducer from "./supplierSlice"
import warehouseReducer from "./warehouseSlice"
import purchaseReducer from "./purchaseSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    units:unitReducer,
    taxes:taxReducer,
    customers:customerReducer,
    suppliers:supplierReducer,
    warehouses:warehouseReducer,
    purchases:purchaseReducer,
  },
});
