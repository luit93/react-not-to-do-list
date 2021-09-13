import {
  createUserSuccess,
  requestPending,
  requestFail,
  loginUserSuccess,
  userLogout,
} from "./userSlice";
import { postUser, getUser } from "../../apis/userApi";

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
//login user
export const loginUser = (userName) => async (dispatch) => {
  dispatch(requestPending());
  //call api
  const data = await getUser(userName);
  console.log(data);
  if (data?.result?._id) {
    const { _id, userName } = data.result;
    window.localStorage.setItem("_id", _id);
    window.localStorage.setItem("userName", userName);
    dispatch(loginUserSuccess(data));
    return;
  }
  dispatch(requestFail(data));
};

//logout user

export const logOut = () => (dispatch) => {
  window.localStorage.removeItem("_id");
  window.localStorage.removeItem("userName");
  dispatch(userLogout());
};
