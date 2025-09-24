import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base
const API_URL = "http://localhost:5000/api/products";

// Async thunks
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
