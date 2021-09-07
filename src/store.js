import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/task-list/taskSlice";

const store = configureStore({
  reducer: { task: taskReducer },
});

export default store;
