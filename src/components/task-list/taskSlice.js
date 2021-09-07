import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  taskLists: [],
  badLists: [],
  status: "",
  message: "",
  isLoading: false,
  totalHrs: 0,
  taskToDelete: [],
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
    deleteTaskSuccess: (state, { payload: { status, message } }) => {
      //nested destructuring
      state.isLoading = false;
      state.status = status;
      state.message = message;
      state.taskToDelete = [];
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

    setIdToDelete: (state, { payload }) => {
      const { checked, value } = payload;
      console.log(checked, value);
      if (checked) {
        //add to array
        state.taskToDelete = [...state.taskToDelete, value];
      } else {
        //remove from array
        const args = state.taskToDelete.filter((item) => item !== value);
        state.taskToDelete = args;
      }
    },
    requestFail: (state, { payload }) => {
      const { status, message } = payload;
      state.status = status;
      state.message = message;
    },
  },
});

const { reducer, actions } = taskSlice;

export const {
  updateTaskSuccess,
  requestPending,
  fetchTaskListSuccess,
  setIdToDelete,
  deleteTaskSuccess,
  requestFail,
} = actions;
export default reducer;
