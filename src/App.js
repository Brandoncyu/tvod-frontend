import React, { Component } from 'react';
import AuthenticateRoute from './helpers/AuthenticatedRoutes'
import Register from './components/signin/Register'
import Login from './components/signin/Login'
import auth from './models/auth'
import UserProfile from './components/UserProfile'
import ShowSelect from './components/ShowSelect'
import SearchPage from './components/SearchPage'
import FollowUsers from './components/FollowUsers'
import './App.css';
import { setUser } from './actions/auth.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
  }

  componentDidMount = async() => {
    const response = await auth.verify()
    if (response) {
      this.props.setUser()
    }
  }

  render() {
    return (
      <Switch>
        <AuthenticateRoute exact path="/" render={(props)=>{
          return <UserProfile />
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
