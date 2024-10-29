import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3200/admin";

export const addCategory = createAsyncThunk("admin/addCategory",async (details, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${BASE_URL}/addCategory`,details);
        localStorage.setItem("token", response.data.token);
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});


export const getCategoryByID = createAsyncThunk("admin/getCategoryById", async (id,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${BASE_URL}/getCategorybyid/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const getallCategory = createAsyncThunk("admin/getallCategory", async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${BASE_URL}/getallCategory`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const updateCategory = createAsyncThunk("admin/updateCategory", async (details,{rejectWithValue}) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateCategory`,details);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const deleteCategory = createAsyncThunk("admin/deletecategory", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteCategory/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: null,
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
          state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload),
                state.loading = false,
                state.error = null
            })
            .addCase(addCategory.rejected, (state) => {
                state.error = action.payload,
                state.loading = false
            });
        builder
            .addCase(getCategoryByID.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(getCategoryByID.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false,
                state.error = null
            })
            .addCase(getCategoryByID.rejected, (state) => {
                state.error = action.payload,
                state.loading = false
            });
        builder
            .addCase(getallCategory.pending, (state) => {
                state.loading = true,
                state.error = null;
            })
            .addCase(getallCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getallCategory.rejected, (state) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateCategory.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(p => p.id === action.payload.id);
                if (index !== -1){
                    state.categories[index] = action.payload;
                }                
                state.loading = false,
                state.error = null
            })
            .addCase(updateCategory.rejected, (state) => {
                state.error = action.payload,
                state.loading = false
            });
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter( p => p.id != action.payload.id),
                state.loading = false,
                state.error = null
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.error = action.payload,
                state.loading = false
            });
    }
});

export const { clearError } = categorySlice.actions;

export default categorySlice.reducer;

