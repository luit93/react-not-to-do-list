import "./App.css";
import { useState } from "react";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { TaskList } from "./components/task-list/TaskList";
import { BadTaskList } from "./components/bad-tasks-list/BadTaskList";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);

  const taskHours = tasks?.reduce((subTotal, item) => subTotal + +item?.hr, 0);
  const badTaskHours = badTasks?.reduce(
    (subTotal, item) => subTotal + +item?.hr,
    0
  );
  const totalHours = taskHours + badTaskHours;
  const ttlPwk = 168;
  const handleOnSubmit = (data) => {
    setTasks([...tasks, data]);
    if (totalHours + +data.hr > ttlPwk) {
      setHrsError(true);
      return;
    }
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
    const selectedItem = badTasks[i];
    setTasks([...tasks, selectedItem]);
    const tempArg = badTasks.filter((item, index) => index !== i);
    setBadTasks(tempArg);
  };

  const handleOnTaskClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Container fluid className="text-center">
        <Row className="mt-5">
          <Col>
            {" "}
            <h1>Not To Do Task List</h1>
          </Col>
        </Row>
        <hr />

        {hrsError && (
          <AlertDisplay
            color="danger"
            text={"You don't have enough hours left this week"}
          />
        )}

        <AddTaskForm handleSubmit={handleOnSubmit} />
        <hr />
        <Row>
          <Col md="6">
            <TaskList
              badTasks={badTasks}
              tasks={tasks}
              markAsBadList={markAsBadList}
              handleOnTaskClick={handleOnTaskClick}
            />
          </Col>
          <Col md="6">
            <BadTaskList
              badTasks={badTasks}
              markToDo={markToDo}
              badTaskHours={badTaskHours}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <AlertDisplay
              color="info"
              text={`Total hours allocated = ${totalHours} hours/week`}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
