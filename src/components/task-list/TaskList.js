import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BadTaskList } from "../bad-tasks-list/BadTaskList";
import { useDispatch, useSelector } from "react-redux";
import { taskSwitcher } from "./taskAction";
import { setIdToDelete } from "./taskSlice";

export const TaskList = ({ handleOnTaskClick, indexToDeleteFromTask }) => {
  // console.log(tasks, " from taskLists");
  // const [exitData, setExitData] = useState([]);

  // const handleOnClick = (i) => {
  //   console.log(tasks[i]);
  //   const { name, value } = tasks[i];
  //   setExitData({ ...exitData, [name]: value });
  //   handleSubmit(exitData);
  // };
  const dispatch = useDispatch();
  const { taskLists, taskToDelete } = useSelector((state) => state.task);
  return (
    <div>
      <h2>Task List</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Task</th>
            <th>Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskLists.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={item._id}
                  onChange={(e) => dispatch(setIdToDelete(e.target))}
                  checked={taskToDelete.includes(item._id)}
                />{" "}
                <label>{item.task}</label>
              </td>
              <td>{item.hr}</td>
              <td>
                <Button
                  onClick={() =>
                    dispatch(taskSwitcher({ id: item._id, toDo: false }))
                  }
                >
                  Mark As Not To Do
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
