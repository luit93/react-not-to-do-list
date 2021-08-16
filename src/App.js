import "./App.css";
import { useState } from "react";
import { TaskList } from "./components/task-list/TaskList";
import { BadTaskList } from "./components/bad-tasks-list/BadTaskList";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);

  const totalHours = tasks?.reduce((subTotal, item) => subTotal + +item.hr, 0);

  const handleOnSubmit = (data) => {
    setTasks([...tasks, data]);
  };
  //mark task list to bad list
  const markAsBadList = (i) => {
    console.log(i);
    //take selected item and put in bad list
    const selectedItem = tasks[i];
    setBadTasks([...badTasks, selectedItem]);
    console.log(badTasks);
    //remove selected task from task list with filter
    const tempArg = tasks.filter((item, index) => index !== i);
    setTasks(tempArg);
    //remove selected task from task list with splice
    // const tempArg = [...tasks]
    // tempArg.splice(i,1)
    // setTasks(tempArg);
  };

  const markToDo = (i) => {
    const selectedItem = tasks[i];
    setTasks([...tasks, selectedItem]);
    const tempArg = badTasks.filter((item, index) => index !== i);
    setBadTasks(tempArg);
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
            <TaskList
              badTasks={badTasks}
              tasks={tasks}
              markAsBadList={markAsBadList}
            />
          </Col>
          <Col md="6">
            <BadTaskList badTasks={badTasks} markToDo={markToDo} />
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
};

export default App;
