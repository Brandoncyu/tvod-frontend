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
import { userLogin } from '../../actions/auth.actions'
import { withRouter } from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { username, password } = this.state

    this.props.userLogin({username, password}, this.props.history)
  }

  render () {
    return (
      <Container>
        <Row>
          <Col xs="3"></Col>
          <Col>
            <Form onSubmit={this.onSubmit} id="login">
              <h3>Login to T.V.O.D.</h3>
              <FormGroup>
                <Label htmlFor="login-username">Username</Label>
                 <Input
                  type="text"
                  name="login-username"
                  id="login-username"
                  placeholder="Enter Your Username"
                  value={this.state.username}
                  onChange={e => this.setState({username: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="login-password">Password</Label>
                 <Input
                  type="password"
                  name="login-password"
                  id="login-password"
                  placeholder="Enter Your Password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <a href="./register">I am not yet registered, sign me up to T.V.O.D.</a>
              </FormGroup>
              <Button color="primary">Login!</Button>
            </Form>
          </Col>
          <Col xs="3"></Col>
        </Row>
      </Container>)
  }
}

function mapStateToProps(state) {
  return {
    showLoginError: state.auth.showLoginError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
