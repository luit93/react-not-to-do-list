import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchTaskLists } from "./components/task-list/taskAction";
const App = () => {
  const dispatch = useDispatch();
  const { totalHrs, isLoading, status, message } = useSelector(
    (state) => state.task
  );
  const [tasks, setTasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  // const [isLoading, setIsLoading] = useState([false]);

  // const totalHours = tasks?.reduce((subTotal, item) => subTotal + +item?.hr, 0);

  const ttlPwk = 168;

  useEffect(() => {
    dispatch(fetchTaskLists());
  }, []);
  // fetch t elatest data from server and set it in state
  const fetchLatest = async () => {
    const { result } = await fetchAllTasks();
    result && setTasks(result);
  };
  const handleOnSubmit = async (data) => {
    if (totalHrs + +data.hr > ttlPwk) {
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

        {message && (
          <AlertDisplay
            color={status === "success" ? "success" : "danger"}
            text={message}
          />
        )}

        <AddTaskForm handleSubmit={handleOnSubmit} />
        {isLoading && <Spinner variant="danger" animation="grow" />}
        <hr />
        <Row>
          <Col md="6">
            <TaskList
              markAsBadList={switchTask}
              handleOnTaskClick={handleOnTaskClick}
              indexToDeleteFromTask={indexToDeleteFromTask}
            />
          </Col>
          <Col md="6">
            <BadTaskList
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
              text={`Total hours allocated = ${totalHrs} hours/week`}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
