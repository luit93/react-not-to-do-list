import "./App.css";

import { useSelector } from "react-redux";

import { Container } from "react-bootstrap";

import { UserForm } from "./components/user-form/UserForm";

import { MainContent } from "./components/main-content/MainContent";
const App = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  //mark task list to bad list

  return (
    <div>
      <Container fluid className="text-center">
        {isLoggedIn ? <MainContent /> : <UserForm />}
      </Container>
    </div>
  );
};

export default App;
