import React from "react";
import { useState } from "react";
import { TaskList } from "../task-list/TaskList";
import { Table, Button, Alert } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";

export const BadTaskList = ({
  badTasks,
  markToDo,
  badTaskHours,
  handleOnTaskBadClick,
  indexToDeleteFromBadTask,
}) => {
  console.log(badTasks, " from badTaskLists");
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
          {badTasks.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={item._id}
                  onChange={handleOnTaskBadClick}
                  checked={indexToDeleteFromBadTask.includes(item._id)}
                />{" "}
                <label>{item.task}</label>
              </td>
              <td>{item.hr}</td>
              <td>
                <Button
                  onClick={() => markToDo({ id: item._id, toDo: true })}
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
        text={`You could have saved ${badTaskHours} hrs/week`}
      />
    </div>
  );
};
