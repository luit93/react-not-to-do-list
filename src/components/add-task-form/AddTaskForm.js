import { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import React from "react";
const initialFormData = {
  task: "Watching TV",
  hr: 10,
};
export const AddTaskForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
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
