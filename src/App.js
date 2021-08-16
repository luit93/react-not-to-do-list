import "./App.css";
import { useState } from "react";

import { Container, Col, Row } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
function App() {
  const [tasks, setTasks] = useState([]);
  const handleOnSubmit = (data) => {
    setTasks([...tasks, data]);
  };
  return (
    <div>
      <Container fluid>
        <Row className="mt-5">
          <Col>
            <h1>Not To Do Task List</h1>
          </Col>
        </Row>
        <hr />
        <AddTaskForm handleSubmit={handleOnSubmit} />
        <hr />
      </Container>
    </div>
  );
}

export default App;
