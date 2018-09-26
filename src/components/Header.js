import React, { Component }  from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  removeToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">T.V.O.D.</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/shows">Your Shows</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/following">Following</NavLink>
            </NavItem>
              <NavLink tag={Link} to="/login" onClick={this.removeToken}>Logout
            </NavLink>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
