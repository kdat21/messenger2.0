import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../../../contexts/constants";
import { AuthState } from "../../../types";
import setAuthToken from "../../../utils/setAuthToken";
import { RootState } from "../../store";

const initialState: AuthState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
  socket: null,
};

// Reducer thunk
// Authenticate user
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/cookies`, {
      withCredentials: true,
    });
    if (response.data.success) {
      setAuthToken(response.data.token);
    }

    try {
      const authResponse = await axios.get(`${apiUrl}/auth`);
      if (authResponse.data.success)
        return {
          isAuthenticated: true,
          user: authResponse.data.user,
          socket: null,
        };
    } catch (error) {
      setAuthToken(null);
      return { isAuthenticated: false, user: null, socket: null };
    }
  } catch (error) {
    console.log(error);
    return { isAuthenticated: false, user: null, socket: null };
  }
});

// Login
export const loginUser = async (userForm: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, userForm, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response!.data;
    return { success: false, message: error };
  }
};

// Register
export const registerUser = 
  async (registerForm: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response!.data;
      return { success: false, message: error };
    }
  };

// Verify
export const verifyUser = 
  async (verifyForm: { userId: string; verifyString: string }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/verify/${verifyForm.userId}/${verifyForm.verifyString}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response!.data;
      return { success: false, message: error };
    }
  };

//Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.delete(`${apiUrl}/auth/cookies`, {
      withCredentials: true,
    });
  } catch (error) {
    return { success: false, message: error };
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = action.payload!.isAuthenticated;
        state.user = action.payload!.user;
        state.socket = null;
      })
      .addCase(loadUser.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.socket = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.socket = null;
      })
      .addCase(logoutUser.rejected, (state) => {});
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
