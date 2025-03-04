import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const createOrder = createAsyncThunk(
  "user/neworder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/newOrder`, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderByUserID = createAsyncThunk(
  "user/getOrderByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderByID = createAsyncThunk(
  "user/getOrderById",
  async (id, { rejectWithValue }) => {
    const orderId = req.params;
    try {
      const response = await axios.get(`${BASE_URL}/orderById/${orderId}`, id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderHistory = createAsyncThunk(
  "user/getOrderHistory", async(id, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}/orderHistory/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order.push(action.payload);
        state.status = "success";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(getOrderByUserID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderByUserID.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = "success";
      })
      .addCase(getOrderByUserID.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(getOrderByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderByID.fulfilled, (state, action) => {
        state.order = [action.payload];
        state.status = "success";
      })
      .addCase(getOrderByID.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.order = [action.payload];
        state.status = "success";
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;