import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Dashboard from './components/dashboard';
import About from './components/about';
import Posts from './components/posts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/api/auth/login' component={Login} />
        <Route path='/api/user/register' component={Register} />
        <Route path='/api/user/dashboard' component={Dashboard} />
        <Route path='/api/user/about' component={About} />
        <Route path='/api/user/posts' component={Posts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
