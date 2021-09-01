import "./App.css";
import { useState, useEffect } from "react";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { TaskList } from "./components/task-list/TaskList";
import { BadTaskList } from "./components/bad-tasks-list/BadTaskList";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { postTask, fetchAllTasks } from "./apis/taskApi";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [hrsError, setHrsError] = useState(false);
  const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
  const [indexToDeleteFromBadList, setIndexToDeleteFromBadList] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);

  const taskHours = tasks?.reduce((subTotal, item) => subTotal + +item?.hr, 0);
  const badTaskHours = badTasks?.reduce(
    (subTotal, item) => subTotal + +item?.hr,
    0
  );
  const totalHours = taskHours + badTaskHours;
  const ttlPwk = 168;

  useEffect(() => {
    setIsLoading(true);
    const loadTask = async () => {
      const { result } = await fetchAllTasks();
      setIsLoading(false);
      setTasks(result);
    };

    loadTask();
  }, []);

  const handleOnSubmit = async (data) => {
    if (totalHours + +data.hr > ttlPwk) {
      setHrsError(true);
      return;
    }
    setTasks([...tasks, data]);
    //send data to the server
    const result = await postTask(data);
    console.log(result, "from Api");
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
  const itemToDelete = (checked, value, arg, setArg) => {
    if (checked) {
      //add the index in the array
      setArg([...arg, +value]);
    } else {
      //remove index from array
      const tempArg = arg.filter((item) => item !== +value);
      setArg(tempArg);
    }
  };
  const handleOnTaskClick = (e) => {
    const { checked, value } = e.target;
    itemToDelete(
      checked,
      value,
      indexToDeleteFromTask,
      setIndexToDeleteFromTask
    );
    // return;
    // if (checked) {
    //   //add the index in the array
    //   setIndexToDeleteFromTask([...indexToDeleteFromTask, +value]);
    // } else {
    //   //remove index from array
    //   const tempArg = indexToDeleteFromTask.filter((item) => item !== +value);
    //   setIndexToDeleteFromTask(tempArg);
    // }
  };
  const handleOnBadTaskClick = (e) => {
    const { checked, value } = e.target;
    itemToDelete(
      checked,
      value,
      indexToDeleteFromBadList,
      setIndexToDeleteFromBadList
    );
    // if (checked) {
    //   //add the index in the array
    //   setIndexToDeleteFromBadList([...indexToDeleteFromBadList, +value]);
    // } else {
    //   //remove index from array
    //   const tempArg = indexToDeleteFromBadList.filter(
    //     (item) => item !== +value
    //   );
    //   setIndexToDeleteFromBadList(tempArg);
    // }
  };

  const deleteTask = (arg, setArg, argIndex, setArgIndex) => {
    const tempArg = arg.filter((item, i) => !argIndex.includes(i));
    console.log(tempArg);
    setArg(tempArg);
    setArgIndex([]);
  };
  // const deleteFromBadTaskList = () => {
  //   const tempBadArg = badTasks.filter(
  //     (item, i) => !indexToDeleteFromBadList.includes(i)
  //   );
  //   console.log(tempBadArg);
  //   setBadTasks(tempBadArg);
  //   setIndexToDeleteFromBadList([]);
  // };
  // const deleteFromTask = () => {
  //   const tempArg = tasks.filter(
  //     (item, i) => !indexToDeleteFromTask.includes(i)
  //   );
  //   console.log(tempArg);
  //   setTasks(tempArg);
  //   setIndexToDeleteFromTask([]);
  // };
  const deleteOnClick = () => {
    // deleteFromTask();
    // deleteFromBadTaskList();
    deleteTask(
      tasks,
      setTasks,
      indexToDeleteFromTask,
      setIndexToDeleteFromTask
    );
    deleteTask(
      badTasks,
      setBadTasks,
      indexToDeleteFromBadList,
      setIndexToDeleteFromBadList
    );
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
        {isLoading && <Spinner variant="danger" animation="grow" />}
        <hr />
        <Row>
          <Col md="6">
            <TaskList
              badTasks={badTasks}
              tasks={tasks}
              markAsBadList={markAsBadList}
              handleOnTaskClick={handleOnTaskClick}
              indexToDeleteFromTask={indexToDeleteFromTask}
            />
          </Col>
          <Col md="6">
            <BadTaskList
              badTasks={badTasks}
              markToDo={markToDo}
              badTaskHours={badTaskHours}
              handleOnBadTaskClick={handleOnBadTaskClick}
              indexToDeleteFromBadList={indexToDeleteFromBadList}
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
