import React from "react";
import { Alert } from "react-bootstrap";

export const AlertDisplay = ({ color, text }) => {
  return <Alert variant={color}>{text}</Alert>;
};
