import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../app/services/httpClient";
import { RootState } from "../../app/store";
import { AuthData, UserInfo, login, logout } from "./loginAPI";

export interface LoginState {
  isLoggedIn: boolean;
  auth: AuthData | null;
  status: "idle" | "loading" | "failed";
  userInfo: UserInfo | null;
  error: string | null;
}

export const requestLogin = createAsyncThunk(
  "login/requestLogin",
  async (data: { email: string; password: string }) =>
    login(data.email, data.password)
);

export const requestLogout = createAsyncThunk("logout/requestLogout", logout);

const initialState: LoginState = {
  isLoggedIn: false,
  auth: null,
  status: "idle",
  userInfo: null,
  error: null,
};

const authItem = localStorage.getItem("auth");
let authData: LoginState | null = null;

if (authItem) {
  try {
    authData = JSON.parse(authItem);
  } catch (error) {
    console.error(error);
  }
}

export const loginSlice = createSlice({
  name: "login",
  initialState: authData ?? initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.auth = {
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
        };
        state.userInfo = action.payload.user;
        state.isLoggedIn = true;
        localStorage.setItem("auth", JSON.stringify(state));
        httpClient.setToken(action.payload.token);
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong";
      })
      .addCase(requestLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestLogout.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(requestLogout.fulfilled, (state) => {
        state.auth = null;
        state.userInfo = null;
        state.isLoggedIn = false;
        state.status = "idle";
        localStorage.removeItem("auth");
        httpClient.setToken(null);
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectUserInfo = (state: RootState) => state.login.userInfo;
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
