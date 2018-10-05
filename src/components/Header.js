import React, { Component }  from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { userLogout } from '../actions/auth.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Header extends Component {
  removeToken = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.props.history.push('/login')
    this.props.userLogout()
  }
  render() {
    return (
      <div>
        <Navbar dark={true} color="dark"  expand="md">
          <NavbarBrand tag={Link} to="/">T.V.O.D.</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/shows">Search Shows</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/following">Find Friends</NavLink>
            </NavItem>
              <NavLink onClick={this.removeToken}>Logout
            </NavLink>
          </Nav>
        </Navbar>
      </div>
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
    userLogout: bindActionCreators(userLogout, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
