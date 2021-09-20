import React from 'react';
import ClientForm from './components/form/ClientForm';
import ViewForm from './components/form/ViewForm';
import EditViewForm from './components/form/EditViewForm';
import Login from './components/login/Login';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import InternalClient from './components/admin/InternalClient';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/admin'>
            <AdminDashboard />
          </Route>
          <Route path='/internal'>
            <InternalClient />
          </Route>
          <Route path='/view/:id'>
            <ViewForm />
          </Route>
          <Route path='/edit/:id'>
            <EditViewForm />
          </Route>
          <Route path='/form/:id'>
            <ClientForm />
          </Route>
          <Route path='/client-form/:id'>
            <ClientForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
