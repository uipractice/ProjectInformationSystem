import React from 'react';
import ClientForm from './components/form/ClientForm';
import ViewForm from './components/form/ViewForm';
import EditViewForm from './components/form/EditViewForm';
import Login from './components/login/Login';
import { HashRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import ResetPassword from './components/admin/ResetPassword';
import InternalClient from './components/admin/InternalClient';
import UserDetailsDashboard from './components/admin/UserManagement/UserDetailsDashboard';
import { getAuthToken } from './components/utils/authToken';
import { render } from '@testing-library/react';
const PrivateRoute=({component:Component, ...rest})=>{
  const isAuthenticated=getAuthToken()?true:false;
return(
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)
}
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/client-form/:id' component={ClientForm}>
          </Route>
          <PrivateRoute path='/dashboard' component={AdminDashboard}>
          </PrivateRoute>
          <PrivateRoute path='/reset-password' component={ResetPassword}>
          </PrivateRoute>
          <PrivateRoute path='/internal' component={InternalClient}>
          </PrivateRoute>
          <PrivateRoute path='/view/:id' component={ViewForm}>
          </PrivateRoute>
          <PrivateRoute path='/edit/:id' component={EditViewForm}>
          </PrivateRoute>
          <PrivateRoute path='/form/:id' component={ClientForm}>
          </PrivateRoute>
          <PrivateRoute path='/user-details' component={UserDetailsDashboard}>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
export default App;