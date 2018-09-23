import React, { Component }  from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  NavItem,
  NavLink
} from 'reactstrap';

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
          <NavbarBrand href="/">T.V.O.D.</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/shows">Your Shows</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/following">Following</NavLink>
            </NavItem>
              <NavLink href="/login" onClick={this.removeToken}>Logout
            </NavLink>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
