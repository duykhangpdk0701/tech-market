import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandsApi from "../api/brandApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const fetchBrandsAsync = createAsyncThunk(
  "brands/fetchProductsAsync",
  async () => {
    const res = await brandsApi.fetchBrand();
    return res;
  },
);

export const addBrandAsync = createAsyncThunk(
  "brands/addBrandAsync",
  async (data) => {
    const res = await brandsApi.addBrand(data);
    return res;
  },
);

export const upDateBrandAsync = createAsyncThunk(
  "brands/updateBrandAsync",
  async (data) => {
    const res = await brandsApi.updateBrand(data);
    return res;
  },
);

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.brands;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })
      //addbrand
      .addCase(addBrandAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBrandAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addBrandAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = [...state.current, action.payload];
      })
      // update brand
      .addCase(upDateBrandAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(upDateBrandAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(upDateBrandAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current.forEach((item) => {
          if (item._id === action.payload.brand._id) {
            item = action.payload.brand;
          }
        });
      });
  },
});

export default brandsSlice.reducer;
