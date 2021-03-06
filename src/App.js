import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateTask from './components/dashboard/task/CreateTask';
import TaskShow from './components/dashboard/task/TaskShow';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import TaskSuccess from './components/dashboard/task/TaskSuccess'
import TaskDelete from './components/dashboard/task/TaskDelete'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/quests/create' component={CreateTask} />
          <Route path='/quests/finish' component={TaskSuccess} />
          <Route path='/quests/delete' component={TaskDelete} />
          <Route path='/quests/:id' component={TaskShow} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
