import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data?.data.session?.access_token}`;
      localStorage.setItem("token", response.data?.data.session?.access_token);
      // console.log(response.data.data.session.user.id);  ----> This is giving us the user id
      return {
        user: response.data?.data.session?.user,
        access_token: response.data?.data.session?.access_token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signUp`, credentials);
      localStorage.setItem("token", response.data?.data.session?.access_token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getuser`, {
        withCredentials: true,
      });
      return response.data.user.id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getallusers`);
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAuthState(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logoutUser, clearError, setAuthState } = authSlice.actions;

export default authSlice.reducer;
