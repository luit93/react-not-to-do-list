import React from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";

export const AlertDisplay = ({ color, text }) => {
  const [show, setShow] = useState(true);

  if (color == "danger") {
    if (show) {
      return (
        <Alert variant={color} onClose={() => setShow(false)} dismissible>
          {text}!
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  return <Alert variant={color}>{text}!</Alert>;
};
