import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  taskLists: [],
  badLists: [],
  status: "",
  message: "",
  isLoading: false,
  totalHrs: 0,
};
const taskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    //list of functions to update state values
    requestPending: (state) => {
      state.isLoading = true;
    },
    updateTaskSuccess: (state, { payload: { status, message } }) => {
      //nested destructuring
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },
    fetchTaskListSuccess: (state, { payload }) => {
      const { status, message, result } = payload;
      state.totalHrs = result
        ? result.reduce((subttl, item) => subttl + +item.hr, 0)
        : 0;
      state.isLoading = false;
      //   state.status = status;
      //   state.message = message;
      if (result) {
        //task list only
        state.taskLists = result.filter((item) => item.toDo);

        //bad list only
        state.badLists = result.filter((item) => !item.toDo);
      }
    },
    requestFail: (state, { payload }) => {
      const { status, message } = payload;
      state.isLoading = false;
      state.status = status;
      status.message = message;
    },
  },
});

const { reducer, actions } = taskSlice;

export const {
  updateTaskSuccess,
  requestPending,
  fetchTaskListSuccess,
  requestFail,
} = actions;
export default reducer;
