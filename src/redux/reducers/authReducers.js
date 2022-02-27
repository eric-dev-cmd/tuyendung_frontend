import {
  USER_LOGGEDIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/authConstants";

const token = localStorage?.getItem("token") || null;
const user = JSON.parse(localStorage?.getItem("user")) || null;

const initialState = {
  token: token,
  isAuthenticated: false,
  loading: true,
  user: user,
};
export const userRegisterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        token,
      };
    default:
      return state;
  }
};
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...action.state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
        userInfor: action.payload,
        token,
      };
    case USER_LOGIN_FAIL:
      return {
        ...action.state,
        ...action.payload,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case USER_LOGGEDIN:
      return {
        ...action.state,
        ...action.payload,
        loading: false,
        userInfo: { ...action.payload },
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return {
        loading: false,
        userInfo: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
