import { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../task-list/taskAction";
import { requestFail } from "../task-list/taskSlice";

const initialFormData = {
  task: "Watching TV",
  hr: 10,
};
const totalHrsPerWeek = 168;
export const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const { totalHrs } = useSelector((state) => state.task);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (totalHrs + +formData.hr > totalHrsPerWeek) {
      dispatch(
        requestFail({
          status: "error",
          message: "You don't have enough hours left",
        })
      );
      return;
    }
    const userId = window.localStorage.getItem("_id");
    userId && dispatch(addTask({ ...formData, userId }));
    dispatch(addTask(formData));
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col xs={7}>
          <Form.Control
            name="task"
            placeholder="Task"
            value={formData.task}
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col>
          <Form.Control
            name="hr"
            placeholder="Hours"
            value={formData.hr}
            type="number"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col>
          <Button type="submit">Add Task</Button>
        </Col>
      </Row>
    </Form>
  );
};
