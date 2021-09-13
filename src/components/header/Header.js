import React from "react";
import { Button } from "react-bootstrap";
import { logOut } from "../user-form/userAction";
import { useDispatch } from "react-redux";
export const Header = () => {
  const dispatch = useDispatch();
  const userName = window.localStorage.getItem("userName");
  const handleOnLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="bg-promary d-flex justify-content-end p-3 text-light">
      <h3 className="welcome-msg">Welcome {userName}</h3>
      <Button onClick={handleOnLogout} variant="warning">
        Logout
      </Button>
    </div>
  );
};
