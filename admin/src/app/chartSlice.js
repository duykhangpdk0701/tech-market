import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chartApi from "../api/chartApi";

const initialState = {
  loading: false,
  currentLine: [],
  currentPie: [],
  error: "",
};

export const fetchChartYearAsync = createAsyncThunk(
  "chart/fetchChartYearAsync",
  async () => {
    const res = await chartApi.getYear();
    return res;
  },
);

export const fetchChartCategoryAsync = createAsyncThunk(
  "chart/fetchChartCategoryAsync",
  async () => {
    const res = await chartApi.getCategory();
    return res;
  },
);

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchChartYearAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartYearAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchChartYearAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLine = action.payload.chart;
        state.currentLine.forEach((item) => {
          const monthUsage = item.monthlyusage.map((i) => i.month);
          for (let index = 1; index <= 12; index++) {
            if (!monthUsage.includes(index)) {
              item.monthlyusage.push({ month: index, quantity: 0 });
            }
          }
          item.monthlyusage.sort((a, b) => a.month - b.month);
        });
      })

      .addCase(fetchChartCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchChartCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPie = action.payload.chart;
        state.currentPie = state.currentPie.map((item) => {
          return { name: item._id.name, quantity: item.count };
        });
      });
  },
});

export default chartSlice.reducer;
