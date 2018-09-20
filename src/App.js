import React, { Component } from 'react';
import logo from './logo.svg';
// import Register from './components/signin/Register'
// import Login from './components/signin/Login'
import Signin from './components/signin/Signin'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <Switch>

        <Route exact path="/signin" render={()=>{
          return <Signin />
        }} />
        <Redirect to="/signin" />
      </Switch>
    );
  }
}

export default App;
