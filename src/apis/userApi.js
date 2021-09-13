import axios from "axios";
const rootUrl = "http://localhost:8000/api/v1/user";

//adding datat to database
export const postUser = async (newUser) => {
  try {
    const { data } = await axios.post(rootUrl + "/register", newUser);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// login user
export const getUser = async (newUser) => {
  try {
    const { data } = await axios.post(rootUrl, newUser);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
