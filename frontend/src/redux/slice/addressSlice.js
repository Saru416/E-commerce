import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const addAddress = createAsyncThunk(
  "address/add",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/addAddress`, details);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAddress = createAsyncThunk(
  "address/get",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getAddress/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
