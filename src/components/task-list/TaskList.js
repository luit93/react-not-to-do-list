import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BadTaskList } from "../bad-tasks-list/BadTaskList";

export const TaskList = ({ tasks, markAsBadList }) => {
  // console.log(tasks, " from taskLists");
  // const [exitData, setExitData] = useState([]);

  // const handleOnClick = (i) => {
  //   console.log(tasks[i]);
  //   const { name, value } = tasks[i];
  //   setExitData({ ...exitData, [name]: value });
  //   handleSubmit(exitData);
  // };
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
                <Button onClick={() => markAsBadList(i)} key={i} type="submit">
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
