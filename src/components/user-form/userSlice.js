import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "",
  message: "",
  isLoading: false,
  userId: "",
  userName: "",
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    //list of functions to update state values
    requestPending: (state) => {
      state.isLoading = true;
    },
    createUserSuccess: (state, { payload }) => {
      const { status, message } = payload;
      state.status = status;
      state.message = message;
      state.isLoading = false;
    },
    loginUserSuccess: (state) => {
      state.status = "";
      state.message = "";
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
    },
    requestFail: (state, { payload }) => {
      const { status, message } = payload;
      state.status = status;
      state.message = message;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  createUserSuccess,
  requestPending,
  loginUserSuccess,
  userLogout,
  requestFail,
} = actions;
export default reducer;
