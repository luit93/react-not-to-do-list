import React from "react";
import { useState } from "react";
import { TaskList } from "../task-list/TaskList";
import { Table, Button } from "react-bootstrap";

export const BadTaskList = ({ badTasks, markToDo }) => {
  //   console.log(badTasks, " from badTaskLists");
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
              <td>{item.task}</td>
              <td>{item.hr}</td>
              <td>
                <Button onClick={() => markToDo(i)} type="submit">
                  Mark As To Do
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
