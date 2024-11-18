import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user"

export const addtoCart = createAsyncThunk("users/addToCart", async (details, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${BASE_URL}/addtoCart`,details);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getCart = createAsyncThunk('users/getCart',async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${BASE_URL}/getCart`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteCartItem = createAsyncThunk('users/deleteCart',async(id,{rejectWithValue}) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteItemCart/${id}`);
        return response.data;
    } catch (error) {
        rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addtoCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addtoCart.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.status = 'success';
        })
        .addCase(addtoCart.rejected, (state) => {
            state.status = 'falied';
            state.error = action.payload;
        });
        builder
        .addCase(getCart.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        })
        .addCase(getCart.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder
        .addCase(deleteCartItem.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = state.items.filter( p => p.id != action.payload.id);
        })
        .addCase(deleteCartItem.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export default cartSlice.reducer;
