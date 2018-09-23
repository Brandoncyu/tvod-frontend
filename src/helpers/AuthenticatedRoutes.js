import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticateRoute = (props) => {
  return <Route {...props} render={() => {
    return props.isLoggedIn ? props.render() : <Redirect to="/login" />
  }} />
}

export default AuthenticateRoute
