import React from "react";
import { BrowserRouter as Router, Rouite } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  <Router>
    <br />
    <Route path="/" exact component={ExerciseList} />
    <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={CreateUser} />
  </Router>;
}

export default App;
