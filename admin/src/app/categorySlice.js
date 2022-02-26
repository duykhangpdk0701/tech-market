import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesApi from "../api/categoryApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchCategoriesAsync = createAsyncThunk(
  "category/fetchProductsAsync",
  async () => {
    const res = await categoriesApi.fetchCategory();
    return res;
  },
);

export const addCategoryAsync = createAsyncThunk(
  "category/addCategoryAsync",
  async (data) => {
    const res = await categoriesApi.addCategory(data);
    return res;
  },
);

export const categoriessSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.categories;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })
      //add product
      .addCase(addCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = [...state.current, action.payload.category];
      });
  },
});

export default categoriessSlice.reducer;
