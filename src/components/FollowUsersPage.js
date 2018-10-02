import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { shuffle } from './_shuffle'
import { getUserData } from '../actions/followUsersPage'
import CardRows from './followUsersPage/01CardRows'
import {
  Container, Row, Col, CardColumns
} from 'reactstrap';



class FollowUsersPage extends Component {
  constructor(props){
    super(props)
  }

  async componentDidMount() {
    await this.findUser()
    if (this.props.userPage === false){
      this.props.history.push('/following')
    }
    window.scrollTo(0, 0)
  }

  findUser = async () =>{
    const userName = this.props.match.params.name
    const id = localStorage.getItem('id')
    await this.props.getUserData(userName, id)
  }

  render(){
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md="3">
              <img height="200" width="200" src={this.props.userPage.image} />
            </Col>
            <Col>
              <br />
              <h1>{this.props.userPage.username}</h1>
              <br />
              <p>Name: {this.props.userPage.firstname} {this.props.userPage.lastname}</p>
              <p>{this.props.userPage.aboutme}</p>
            </Col>
          </Row>
        </Container>
        <CardRows />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

function mapDispatchToProps(dispatch){
  return{
    getUserData: bindActionCreators(getUserData, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowUsersPage))
