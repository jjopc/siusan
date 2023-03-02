import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../../state/messageSlice";
import { getUser, getAuthHeader } from "../services/authService";
import axios from "axios";

export const logInReducer = createAsyncThunk(
  "auth/logIn",
  async ({ username, password }, thunkAPI) => {
    const url = `${process.env.REACT_APP_AUTH_URL}/login/`;
    try {
      // const response = await logIn(username, password);
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem("siusan.auth", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      // console.log(error.response.data.non_field_errors)
      const message = error.response.data.non_field_errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutReducer = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    const url = `${process.env.REACT_APP_AUTH_URL}/logout/`;
    try {
      const response = await axios.post(url);
      window.localStorage.removeItem("siusan.auth");
      // thunkAPI.dispatch(removePatients());
      return response.data;
    } catch (error) {
      // console.log(error.response.data.non_field_errors)
      const message = error.response.data.non_field_errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const passwordResetReducer = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    const url = `${process.env.REACT_APP_AUTH_URL}/logout/`;
    try {
      const response = await axios.post(url);
      window.localStorage.removeItem("siusan.auth");
      // thunkAPI.dispatch(removePatients());
      return response.data;
    } catch (error) {
      // console.log(error.response.data.non_field_errors)
      const message = error.response.data.non_field_errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logInReducer.pending, (state, action) => {
        console.log("Estoy en PENDING de logInReducer en AuthSlice");
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logInReducer.fulfilled, (state, action) => {
        console.log("Estoy en FULFILLED de logInReducer en AuthSlice");
        state.isLoggedIn = true;
        state.user = getUser(JSON.stringify(action.payload));
      })
      .addCase(logInReducer.rejected, (state, action) => {
        console.log("Estoy en REJECTED de logInReducer en AuthSlice");
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logOutReducer.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
