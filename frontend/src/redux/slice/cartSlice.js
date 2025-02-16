import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const addtoCart = createAsyncThunk(
  "user/addToCart",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/addtoCart`, details);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "user/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getCart/${userId}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "user/updateCartItem", async (details, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateCartItem`,details);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const deleteCartItem = createAsyncThunk(
  "user/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteItemCart/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtoCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "success";
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.status = "falied";
        state.error = action.payload;
      });
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload; // Update cart items with the response
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.filter((p) => p.id != action.payload.id);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
