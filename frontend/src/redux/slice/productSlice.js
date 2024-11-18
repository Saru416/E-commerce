import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

// const setAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
// };

// Add product
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/addProduct`, credentials);
      // localStorage.setItem("token", response.data.token);
      console.log(response.data.product);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      // setAuthHeader();
      const response = await axios.get(`${BASE_URL}/getallProducts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get product by ID
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      // setAuthHeader();
      const response = await axios.get(`${BASE_URL}/product/${id}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, credentials }, { rejectWithValue }) => {
    try {
      // setAuthHeader();
      const response = await axios.put(
        `${BASE_URL}/updateProduct/${id}`,
        credentials
      );
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      // setAuthHeader();
      const response = await axios.delete(`${BASE_URL}/deleteProduct/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    products: [],
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state,action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1){
            state.products[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload.id);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productSlice.actions;

export default productSlice.reducer;
