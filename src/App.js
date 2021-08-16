import "./App.css";
import { useState } from "react";
import { TaskList } from "./components/task-list/TaskList";
import { BadTaskList } from "./components/bad-tasks-list/BadTaskList";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
function App() {
  const [tasks, setTasks] = useState([]);

  const totalHours = tasks.reduce((subTotal, item) => subTotal + +item.hr, 0);

  const handleOnSubmit = (data) => {
    setTasks([...tasks, data]);
  };
  return (
    <div>
      <Container fluid className="text-center">
        <Row className="mt-5">
          <Col>
            <h1>Not To Do Task List</h1>
          </Col>
        </Row>
        <hr />
        <AddTaskForm handleSubmit={handleOnSubmit} />
        <hr />
        <Row>
          <Col md="6">
            <TaskList tasks={tasks} />
          </Col>
          <Col md="6">
            <BadTaskList tasks={tasks} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="info">
              Total hours allocated = {totalHours} hours/week
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
