import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { createnewUser, loginUser } from "./userAction";
import { AlertDisplay } from "../alert/AlertDisplay";
export const UserForm = () => {
  const userRefLogIn = useRef("");
  const userRefReg = useRef("");
  const { isLoading, status, message, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  {
    current: {
    }
  }
  const handleOnLogin = () => {
    const userName = userRefLogIn.current.value;
    console.log(userName);
    dispatch(loginUser({ userName }));
  };
  const handleOnReg = () => {
    const userName = userRefReg.current.value;
    if (!userName) {
      return alert("username needs to be provided");
    }
    dispatch(createnewUser({ userName }));
  };
  return (
    <div className="user-form mt-5 pt-5">
      <h1 className="py-3">Welcome to the task time management</h1>
      <hr />
      <div className="text-muted mb-3">
        This app will allow you to list your weekly task and let mark your task
        as not to do so that you can see how many hours you could have saved
        last week for good purpose.
      </div>
      {message && (
        <AlertDisplay
          color={status === "success" ? "success" : "danger"}
          text={message}
        />
      )}
      {isLoading && <Spinner variant="info" animation="border" />}
      <Row>
        <Col md="6">
          <Card className="p-3">
            <h2 className="mb-3">Login</h2>
            <hr />
            <Form.Control
              ref={userRefLogIn}
              type="email"
              placeholder="Enter userName"
            />

            <Button
              variant="success"
              type="submit"
              className="mt-3"
              onClick={handleOnLogin}
            >
              Login
            </Button>
          </Card>
        </Col>
        <Col md="6">
          <Card className="p-3">
            <h2 className="mb-3">Register</h2>
            <hr />
            <Form.Control
              ref={userRefReg}
              type="email"
              placeholder="Enter userName"
            />
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={handleOnReg}
            >
              Register
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
