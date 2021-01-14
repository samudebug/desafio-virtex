
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import  Dashboard from './dashboard/Dashboard';
import Login from './auth/Login';
import { ProvideAuth } from './auth/AuthContext';

function App() {
  return (
    <div className="App">
      <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          
        </Switch>
      </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
