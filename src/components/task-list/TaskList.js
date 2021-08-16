import React from "react";
import { Table, Button } from "react-bootstrap";

export const TaskList = ({ tasks }) => {
  console.log(tasks, " from taskLists");
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
          {tasks.map((item, i) => (
            <tr key={i}>
              <td>{item.task}</td>
              <td>{item.hr}</td>
              <td>
                <Button>Mark As Not To Do</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
