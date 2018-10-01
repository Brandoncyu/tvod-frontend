import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../../actions/auth.actions'
import { withRouter } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstname: 'New',
      lastname: 'Person',
      email: 'newperson@gmail.com',
      username: 'newperson',
      password: 'password',
      aboutme: 'yadda'
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    let { firstname, lastname, email, username, password, aboutme } = this.state
    var options = Array.from(event.target['register-select'].options)
    let values = options.filter(option => option.selected)
      .map(option => parseInt(option.value))

    await this.props.registerUser({ firstname, lastname, email, username, password, aboutme, values })

    if (!this.props.showSignupError) this.props.history.push('/')
  }

  render () {
    return (
      <Container>
        <Row>
          <Col xs="3"></Col>
          <Col>
            <Form onSubmit={ this.onSubmit } id ="register">
              <h3>Register for T.V.O.D.</h3>
              <FormGroup>
                <Label htmlFor="register-firstname">First Name</Label>
                <Input
                  type="text"
                  name="register-firstname"
                  id="register-firstname"
                  placeholder="Enter Your First Name"
                  value={this.state.firstname}
                  onChange={e=> this.setState({firstname: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-lastname">Last Name</Label>
                <Input
                  type="text"
                  name="register-lastname"
                  id="register-lastname"
                  placeholder="Enter Your Last Name"
                  value={this.state.lastname}
                  onChange={e => this.setState({lastname: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  type="email"
                  name="register-email"
                  id="register-email"
                  placeholder="Enter Your Email"
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-username">Username</Label>
                <Input
                  type="text"
                  name="register-username"
                  id="register-username"
                  placeholder="Enter Your Username"
                  value={this.state.username}
                  onChange={e => this.setState({username: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-password">Password</Label>
                <Input
                  type="password"
                  name="register-password"
                  id="register-password"
                  placeholder="Enter Your Password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-select">Select Your Favorite Genres</Label>
                <Input type="select" name="register-select" id="register-select" multiple>
                  <option value="1">Drama</option>
                  <option value="2">Comedy</option>
                  <option value="3">Suspense</option>
                  <option value="4">Animation</option>
                  <option value="5">Action</option>
                  <option value="6">Family</option>
                  <option value="7">Science-Fiction</option>
                  <option value="8">Adventure</option>
                  <option value="9">Romance</option>
                  <option value="10">Legal</option>
                  <option value="11">Crime</option>
                  <option value="12">Thriller</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register-about-me">About Me</Label>
                <Input
                  type="textarea"
                  name="register-about-me"
                  id="register-about-me"
                  placeholder="Enter Some Info About Yourself"
                  value={this.state.aboutme}
                  onChange={e => this.setState({aboutme: e.target.value})} />
              </FormGroup>
              <Button color="primary">Register!</Button>
            </Form>
            <br />
            { this.props.showSignupError &&
              <p className="font-weight-bold text-danger">Username or Email Already Taken. Please Try Again.</p>
               }
          </Col>
          <Col xs="3"></Col>
        </Row>
      </Container>)
  }
}

function mapStateToProps(state) {
  return {
    showSignupError: state.auth.showSignupError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: bindActionCreators(registerUser, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
