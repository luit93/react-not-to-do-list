import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { loginUserSuccess } from "./components/user-form/userSlice";
import { UserForm } from "./components/user-form/UserForm";
import { Header } from "./components/header/Header";
import { MainContent } from "./components/main-content/MainContent";
const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggedIn && window.localStorage.getItem("userName")) {
      dispatch(loginUserSuccess());
    }
  }, []);
  //mark task list to bad list

  return (
    <div>
      {isLoggedIn && <Header />}
      <Container fluid className="text-center">
        {isLoggedIn ? <MainContent /> : <UserForm />}
      </Container>
    </div>
  );
};

export default App;
