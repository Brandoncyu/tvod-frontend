import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


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

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

export default withRouter(connect(mapStateToProps)(AuthenticateRoute))
