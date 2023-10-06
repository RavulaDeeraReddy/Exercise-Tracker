import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar"
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
      <Route path="/" exact component={ExercisesList} />
      </Routes>
      <Routes>
      <Route path="/edit/:id" component={EditExercise} />
      </Routes>
      <Routes>
      <Route path="/create" component={CreateExercise} />
      </Routes>
      <Routes>
      <Route path="/user" component={CreateUser} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
