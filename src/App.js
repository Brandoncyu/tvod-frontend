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
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class App extends Component {
  constructor(){
    super()

    this.state={
      isLoggedIn: false
    }
  }

  componentDidMount = async() => {
    const response = await auth.verify()
    if (response){
      this.setState({
        isLoggedIn: true
      })
    }
  }

  render() {
    return (
      <Switch>
        <AuthenticateRoute isLoggedIn={this.state.isLoggedIn} exact path="/" render={(props)=>{
          return <UserProfile />
        }} />
        <AuthenticateRoute isLoggedIn={this.state.isLoggedIn} exact path="/shows" render={()=>{
          return <ShowSelect />
        }} />
        <AuthenticateRoute isLoggedIn={this.state.isLoggedIn} path="/shows/:name" render={(props)=>{
          return <SearchPage {...props} />
        }} />
        <AuthenticateRoute isLoggedIn={this.state.isLoggedIn} exact path="/following" render={()=>{
          return <Follow />
        }} />
        <Route exact path="/register" render={(props)=>{
          if (this.state.isLoggedIn) return <Redirect to={ props.location.state ? props.location.state.from.pathname : "/" } />
          return <Register />
        }} />
        <Route exact path="/login" render={(props)=>{
          if (this.state.isLoggedIn) return <Redirect to={ props.location.state ? props.location.state.from.pathname : "/" } />
          return <Login />
        }} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default withRouter(App);
