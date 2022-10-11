import { createContext, FC, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { AuthState, AuthStateType, Props } from "../types";
import axios, { AxiosError } from "axios";
import socketIOClient from "socket.io-client";
import { apiUrl, SET_AUTH, SET_LOG_OUT_AUTH } from "./constants";
import setAuthToken from "../utils/setAuthToken";

axios.defaults.withCredentials = true;

const initialState: AuthState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
  socket: null,
};

export const AuthContext = createContext<AuthStateType | null>(null);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Authenticate user
  const loadUser = async () => {
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
          dispatch({
            type: SET_AUTH,
            payload: { isAuthenticated: true, user: authResponse.data.user, socket: socketIOClient(`http://localhost:5000`) },
          });
      } catch (error) {
        setAuthToken(null);
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: false, user: null, socket: null },
        });
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Register
  const registerUser = async (registerForm :{ email: string; username: string; password: string}) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm, {withCredentials: true})

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response!.data;
      return { success: false, message: error };
    }
  }

  // Verify
  const verifyUser = async (userId: string, verifyString: string) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/verify/${userId}/${verifyString}`)
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response!.data;
      return { success: false, message: error };
    }
  }

  // Login
  const loginUser = async (userForm: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm, {
        withCredentials: true,
      });

      await loadUser();

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response!.data;
      return { success: false, message: error };
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/auth/cookies`, {withCredentials: true})
      if (response.data.success){
        dispatch({
          type: SET_LOG_OUT_AUTH,
          payload: { isAuthenticated: false, user: null, socket: null },
        });
      }
    } catch (error) {
      return { success: false, message: error };
    }
  }

  // Return provider
  return (
    <AuthContext.Provider value={{ authState, registerUser, verifyUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
