import React, { Component } from 'react';
import AuthenticateRoute from './helpers/AuthenticatedRoutes'
import Register from './components/signin/Register'
import Login from './components/signin/Login'
import auth from './models/auth'
import UserProfile from './components/UserProfile'
import Schedule from './components/Schedule'
import ShowSelect from './components/ShowSelect'
import SearchPage from './components/SearchPage'
import FollowUsers from './components/FollowUsers'
import FollowUsersPage from './components/FollowUsersPage'
import './App.css';
import { setUser } from './actions/auth.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount = async() => {
    const response = await auth.verify()
    if (response) {
      this.props.setUser()
    }
  }

  render() {
    return (
      <Switch>
        <AuthenticateRoute exact path="/" render={()=>{
          return <UserProfile />
        }} />
        <AuthenticateRoute exact path="/schedule" render={()=>{
          return <Schedule />
        }} />
        <AuthenticateRoute exact path="/shows" render={()=>{
          return <ShowSelect />
        }} />
        <AuthenticateRoute path="/shows/:name" render={(props)=>{
          return <SearchPage {...props} />
        }} />
        <AuthenticateRoute exact path="/following" render={()=>{
          return <FollowUsers />
        }} />
        <AuthenticateRoute exact path="/following/:name" render={(props)=>{
          return <FollowUsersPage {...props}/>
        }} />
        <Route exact path="/register" render={(locationProps)=>{
          if (this.props.isLoggedIn) return <Redirect to={ locationProps.location.state ? locationProps.location.state.from.pathname : "/" } />
          return <Register />
        }} />
        <Route exact path="/login" render={(locationProps)=>{
          if (this.props.isLoggedIn) return <Redirect to={ locationProps.location.state ? locationProps.location.state.from.pathname : "/" } />
          return <Login />
        }} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

function mapDispatchToProps(dispatch){
  return{
    setUser: bindActionCreators(setUser, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
