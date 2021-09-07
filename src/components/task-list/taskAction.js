import {
  requestPending,
  requestFail,
  fetchTaskListSuccess,
  addTaskSuccess,
} from "./taskSlice";
import { fetchAllTasks, postTask } from "../../apis/taskApi";
//fetching all the tasks from server
export const fetchTaskLists = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await fetchAllTasks();
  console.log(data);
  data.status === "success"
    ? dispatch(fetchTaskListSuccess(data))
    : dispatch(requestFail(data));
};

//add new task in database

export const addTask = (newTask) => async (dispatch) => {
  dispatch(requestPending());
  const data = await postTask(newTask);
  console.log(data);

  if (data.status === "success") {
    dispatch(fetchTaskListSuccess(data));
    dispatch(fetchTaskLists());
  } else {
    dispatch(requestFail(data));
  }
};
