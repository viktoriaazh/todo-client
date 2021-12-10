import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/TodoNavbar";
import TodosList from "./components/TodoList";
import EditTodo from "./components/TodoEdit";
import CreateTodo from "./components/TodoCreate";
import CreateUser from "./components/TodoCreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/user" component={CreateUser} />
        
      </div>
    </Router>
  );
}

export default App;
