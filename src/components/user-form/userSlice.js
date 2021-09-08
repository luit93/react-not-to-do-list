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

    requestFail: (state, { payload }) => {
      const { status, message } = payload;
      state.status = status;
      state.message = message;
    },
  },
});

const { reducer, actions } = userSlice;

export const { requestPending, requestFail } = actions;
export default reducer;
