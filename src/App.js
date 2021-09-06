import "./App.css";
import { useState, useEffect } from "react";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { TaskList } from "./components/task-list/TaskList";
import { BadTaskList } from "./components/bad-tasks-list/BadTaskList";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import {
  postTask,
  fetchAllTasks,
  deleteTasks,
  updateTasks,
} from "./apis/taskApi";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);

  const totalHours = tasks?.reduce((subTotal, item) => subTotal + +item?.hr, 0);

  const ttlPwk = 168;

  useEffect(() => {
    setIsLoading(true);
    const loadTask = async () => {
      const { result } = await fetchAllTasks();
      setIsLoading(false);
      result && setTasks(result);
    };

    loadTask();
  }, []);
  // fetch t elatest data from server and set it in state
  const fetchLatest = async () => {
    const { result } = await fetchAllTasks();
    result && setTasks(result);
  };
  const handleOnSubmit = async (data) => {
    if (totalHours + +data.hr > ttlPwk) {
      setHrsError(true);
      return;
    }
    //send data to the server
    const result = await postTask(data);
    console.log(result, "from Api");
    if (result?.status === "success") {
      fetchLatest();
    }
  };

  //mark task list to bad list
  const switchTask = async (obj) => {
    //take selected item and put in bad list
    //call api to update th task
    const result = await updateTasks(obj);
    if (result?.status === "success") {
      fetchLatest();
    }
    //re fetch all tasks
  };

  const handleOnTaskClick = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      //add the index in the array
      setIndexToDeleteFromTask([...indexToDeleteFromTask, value]);
    } else {
      //remove index from array
      const tempArg = indexToDeleteFromTask.filter((item) => item !== value);
      setIndexToDeleteFromTask(tempArg);
    }
  };

  const deleteOnClick = async () => {
    //call api from server
    const result = await deleteTasks(indexToDeleteFromTask);
    if (result?.status === "success") {
      fetchLatest();
    }
  };
  //task list only
  const taskListOnly = tasks.filter((item) => item.toDo);

  //bad list only
  const badListOnly = tasks.filter((item) => !item.toDo);
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
        {isLoading && <Spinner variant="danger" animation="grow" />}
        <hr />
        <Row>
          <Col md="6">
            <TaskList
              tasks={taskListOnly}
              markAsBadList={switchTask}
              handleOnTaskClick={handleOnTaskClick}
              indexToDeleteFromTask={indexToDeleteFromTask}
            />
          </Col>
          <Col md="6">
            <BadTaskList
              badTasks={badListOnly}
              markToDo={switchTask}
              handleOnTaskBadClick={handleOnTaskClick}
              indexToDeleteFromBadTask={indexToDeleteFromTask}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={deleteOnClick}
              variant="danger"
              className="btn-block"
            >
              Delete
            </Button>
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
