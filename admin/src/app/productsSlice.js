import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProductsAsync",
  async () => {
    const res = await productsApi.fetchProducts();
    return res;
  },
);

export const toggleActive = createAsyncThunk(
  "product/disactiveAsync",
  async (data) => {
    const { id, isActive } = data;
    const res = await productsApi.disactiveProduct(id, isActive);
    return res;
  },
);

export const addProductAsync = createAsyncThunk(
  "product/addProductAsync",
  async (data) => {
    const { formData } = data;
    const res = await productsApi.addProdutc(formData);
    return res;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.products;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })
      // toggle active
      .addCase(toggleActive.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(toggleActive.fulfilled, (state, action) => {
        state.loading = false;

        state.current.forEach((item) => {
          if (item._id === action.payload.product._id) {
            item.isActive = !item.isActive;
          }
        });
      })

      .addCase(addProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = [...state.current, ...action.payload.product];
      });
  },
});

export default productsSlice.reducer;
