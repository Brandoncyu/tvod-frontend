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
      password: 'password'
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    const { username, password } = this.state

    await this.props.userLogin({username, password})
    if (!this.props.showLoginError) this.props.history.push('/')
    this.setState ({
      username: '',
      password: ''
    })
  }

  render () {
    return (
      <Container fluid={true}>
        <Row>
          <Col md="3">
            <h1 id ="title">T.V.O.D.</h1>
          </Col>
          <Col>
            <div className="form-spacing">
              <Form onSubmit={this.onSubmit} className="p-4" id="signin-form">
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
                  <a href="./register">I am not yet registered, sign me up to T.V.O.D.</a>
                </FormGroup>
                <Button color="primary">Login!</Button>
                { this.props.showLoginError &&
                  <h4 className="font-weight-bold p-3 text-danger">Username and Password Combination Not Found. Please Try Again.</h4>
                   }
              </Form>
              <br />

            </div>
          </Col>
          <Col md="3"></Col>
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
