import { requestPending, requestFail, fetchTaskListSuccess } from "./taskSlice";
import { fetchAllTasks } from "../../apis/taskApi";

export const fetchTaskLists = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await fetchAllTasks();
  console.log(data);
  dispatch(fetchTaskListSuccess(data));
};
