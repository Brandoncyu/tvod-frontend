import React, { Component } from 'react';
import AuthenticateRoute from './helpers/AuthenticatedRoutes'
import Register from './components/signin/Register'
import Login from './components/signin/Login'
import auth from './models/auth'
import UserProfile from './components/UserProfile'
import ShowSelect from './components/ShowSelect'
import SearchPage from './components/SearchPage'
import Follow from './components/Follow'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
  }

  componentDidMount = async() => {
    const response = await auth.verify()
    if (response){
      this.setState({
        isLoggedIn: true
      })
      this.props.history.push(`/`)
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={()=>{
          return <UserProfile />
        }} />
        <Route exact path="/shows" render={()=>{
          return <ShowSelect />
        }} />
        <Route path="/shows/:name" render={(props)=>{
          return <SearchPage {...props} />
        }} />
        <Route exact path="/following" render={()=>{
          return <Follow />
        }} />
        <Route exact path="/register" render={()=>{
          return <Register />
        }} />
        <Route exact path="/login" render={()=>{
          return <Login />
        }} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default App;
