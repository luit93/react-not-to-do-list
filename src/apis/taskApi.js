import axios from "axios";
const rootUrl = "http://localhost:8000/api/v1/";

//adding datat to database
export const postTask = async (newTask) => {
  try {
    const { data } = await axios.post(rootUrl, newTask);
    return data.then();
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

//fetch all the tasks from database
export const fetchAllTasks = async () => {
  try {
    const { data } = await axios.get(rootUrl);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
