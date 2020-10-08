import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from "./components/Display";
import ScheduleForm from './components/ScheduleForm';
import EditSchedule from './components/EditSchedule';
import { Link, Router } from '@reach/router';

function App() {
  return (
    <div className="container">
      <h1>Schedule App</h1>
      <Link className="btn btn-info" to="/">Schedule</Link>
      <Link className="btn btn-info" to="/new">New Activity</Link>
      <Router className="my-5">
        <Display path="/" />
        <ScheduleForm path="/new" />
        <EditSchedule path="/edit/:_id" />
      </Router>
    </div>
  );
}

export default App;
