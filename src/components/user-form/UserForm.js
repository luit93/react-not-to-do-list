import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export const UserForm = () => {
  return (
    <div className="user-form mt-5 pt-5">
      <h1 className="py-3">Welcome to the task time management</h1>
      <hr />
      <div className="text-muted mb-3">
        This app will allow you to list your weekly task and let mark your task
        as not to do so that you can see how many hours you could have saved
        last week for good purpose.
      </div>

      <Row>
        <Col>
          <Card className="p-3">
            <h2 className="mb-3">Login</h2>
            <hr />
            <Form.Control type="email" placeholder="Enter email" />

            <Button variant="success" type="submit" className="mt-3">
              Login
            </Button>
          </Card>
        </Col>
        <Col>
          <Card className="p-3">
            <h2 className="mb-3">Register</h2>
            <hr />
            <Form.Control type="email" placeholder="Enter email" />
            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
