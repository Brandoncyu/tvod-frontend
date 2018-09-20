import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  FormContainer,
  Container,
  Row,
  Col,
  Alert,
  Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class Signin extends Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <Container>
        <Row>
          <Col xs="3"></Col>
          <Col>
            <Form id="login">
              <h3>Login to T.V.O.D.</h3>
              <FormGroup>
                <Label htmlFor="login-username">Username</Label>
                 <Input type="text" name="login-username" id="login-username" placeholder="Enter Your Username" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="login-password">Password</Label>
                 <Input type="password" name="login-password" id="login-password" placeholder="Enter Your Password" />
              </FormGroup>
              <Button color="primary">Login!</Button>
            </Form>
            <Form id ="register">
              <h3>Register for T.V.O.D.</h3>
              <FormGroup>
                <Label htmlFor="register-firstname">First Name</Label>
                <Input type="text" name="register-firstname" id="register-firstname" placeholder="Enter Your First Name" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-lastname">Last Name</Label>
                <Input type="text" name="register-lastname" id="register-lastname" placeholder="Enter Your Last Name" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-email">Email</Label>
                <Input type="email" name="register-email" id="register-email" placeholder="Enter Your Email" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-username">Username</Label>
                <Input type="text" name="register-username" id="register-username" placeholder="Enter Your Username" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-password">Password</Label>
                <Input type="password" name="register-password" id="register-password" placeholder="Enter Your Password" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-select">Select Your Favorite Genres</Label>
                <Input type="select" name="register-select" id="register-select" multiple>
                  <option id="1">Drama</option>
                  <option id="2">Comedy</option>
                  <option id="3">Suspense</option>
                  <option id="4">Animation</option>
                  <option id="5">Action</option>
                  <option id="6">Family</option>
                  <option id="7">Science-Fiction</option>
                  <option id="8">Adventure</option>
                  <option id="9">Romance</option>
                  <option id="10">Legal</option>
                  <option id="11">Crime</option>
                  <option id="12">Thriller</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-about-me">About Me</Label>
                <Input type="textarea" name="register-about-me" id="register-about-me" placeholder="Enter Some Info About Yourself" />
              </FormGroup>
              <Button color="primary">Register!</Button>
            </Form>
          </Col>
          <Col xs="3"></Col>
        </Row>
      </Container>)
  }
}

export default Signin
