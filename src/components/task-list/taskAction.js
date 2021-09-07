import {
  requestPending,
  requestFail,
  fetchTaskListSuccess,
  updateTaskSuccess,
} from "./taskSlice";
import { fetchAllTasks, postTask, updateTasks } from "../../apis/taskApi";
//fetching all the tasks from server
export const fetchTaskLists = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await fetchAllTasks();
  console.log(data);
  data.status === "success"
    ? dispatch(fetchTaskListSuccess(data))
    : dispatch(requestFail(data));
};

//update new task in database

export const addTask = (newTask) => async (dispatch) => {
  dispatch(requestPending());
  const data = await postTask(newTask);
  console.log(data);

  if (data.status === "success") {
    dispatch(updateTaskSuccess(data));
    dispatch(fetchTaskLists());
  } else {
    dispatch(requestFail(data));
  }
};

//switch tasks between the lists

export const taskSwitcher = (obj) => async (dispatch) => {
  dispatch(requestPending());

  const data = await updateTasks(obj);
  console.log(data);
  if (data.status === "success") {
    dispatch(updateTaskSuccess(data));
    dispatch(fetchTaskLists());
  } else {
    dispatch(requestFail(data));
  }
};
