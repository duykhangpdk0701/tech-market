import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import providerApi from "../api/providerApi";

const initialState = {
  loading: false,
  current: [],
  error: "",
};

export const getAllProviderAsync = createAsyncThunk(
  "provider/getAllProviderAsync",
  async () => {
    const res = await providerApi.getAll();
    return res;
  },
);

export const addProviderAsync = createAsyncThunk(
  "provider/addProviderAsync",
  async (data) => {
    const res = await providerApi.add(data);
    return res;
  },
);

export const providerSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProviderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProviderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllProviderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.providers;
        state.current.forEach((o, i) => {
          o.id = i + 1;
        });
      })

      .addCase(addProviderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProviderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addProviderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current.push(action.payload.provider);
      });
  },
});

export default providerSlice.reducer;
