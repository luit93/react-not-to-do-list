import { createUserSuccess, requestPending, requestFail } from "./userSlice";
import { postUser } from "../../apis/userApi";

//create new user in database
export const createnewUser = (userObj) => async (dispatch) => {
  dispatch(requestPending());
  //call api
  const data = await postUser(userObj);
  if (data.status === "success") {
    dispatch(createUserSuccess(data));
    return;
  }

  dispatch(requestFail(data));
};
