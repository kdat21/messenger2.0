import { SET_AUTH, SET_LOG_OUT_AUTH } from "../contexts/constants";
import { AuthAction, AuthState } from "../types";

export const authReducer = (state: AuthState, action: AuthAction) => {
  const {
    type,
    payload: { isAuthenticated, user, socket },
  } = action;

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        socket,
      };

    case SET_LOG_OUT_AUTH:
      state.socket?.disconnect();
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        socket,
      };

    default:
      return state;
  }
};
