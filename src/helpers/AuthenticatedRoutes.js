import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticateRoute = (props) => {
  return <Route {...props} render={(locationProps) => {
    return props.isLoggedIn ? props.render(locationProps) : <Redirect
          to={{
            pathname: "/login",
            state: { from: locationProps.location }
          }}
        />
  }} />
}

export default AuthenticateRoute
