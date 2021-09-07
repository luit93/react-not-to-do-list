import React from "react";
import { useState } from "react";
import { TaskList } from "../task-list/TaskList";
import { Table, Button, Alert } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";
import { useDispatch, useSelector } from "react-redux";
import { taskSwitcher } from "../task-list/taskAction";
import { setIdToDelete } from "../task-list/taskSlice";

export const BadTaskList = ({
  handleOnTaskBadClick,
  indexToDeleteFromBadTask,
}) => {
  const { badLists, taskToDelete } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const badHrs = badLists.reduce((subTl, item) => subTl + item.hr, 0);
  return (
    <div>
      <h2>Bad Task List</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Task</th>
            <th>Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {badLists.map((item, i) => (
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
                    dispatch(taskSwitcher({ id: item._id, toDo: true }))
                  }
                  type="submit"
                >
                  Mark As To Do
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AlertDisplay
        color="info"
        text={`You could have saved ${badHrs} hrs/week`}
      />
    </div>
  );
};
