import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AlertDisplay } from "../alert/AlertDisplay";
import { TaskList } from "../task-list/TaskList";
import { BadTaskList } from "../bad-tasks-list/BadTaskList";
import { AddTaskForm } from "../add-task-form/AddTaskForm";
import { fetchTaskLists, handleOnDeleteItems } from "../task-list/taskAction";

import { Container, Col, Row, Button, Spinner } from "react-bootstrap";

export const MainContent = () => {
  const dispatch = useDispatch();
  const { totalHrs, isLoading, status, message, taskToDelete } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    dispatch(fetchTaskLists());
  }, []);
  const ttlPwk = 168;

  return (
    <div>
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

      <AddTaskForm />
      {isLoading && <Spinner variant="danger" animation="grow" />}
      <hr />
      <Row>
        <Col md="6">
          <TaskList />
        </Col>
        <Col md="6">
          <BadTaskList />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => dispatch(handleOnDeleteItems(taskToDelete))}
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
    </div>
  );
};
