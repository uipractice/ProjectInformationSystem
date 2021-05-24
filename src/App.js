import React from 'react'
import ClinetForm from './components/ClinetForm'
import Login from './components/Login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'

import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
            <Switch>
                <Route exact path="/"> <Login/> </Route>
                <Route path="/client_form"> <ClinetForm/> </Route>
                <Route path="/admin_dashboard"> <AdminDashboard/> </Route>   
            </Switch>          
        </Router>
    </div>
  );
}

export default App;
