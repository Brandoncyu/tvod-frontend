import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { addFollow } from '../models/followUsers'
import { getUserData } from '../actions/followUsersPage'
import CardRows from './followUsersPage/01CardRows'
import ActivityList from './followUsersPage/03ActivityList'
import {
  Container, Row, Col, Button
} from 'reactstrap';



class FollowUsersPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      following: false,
    }
  }

  async componentDidMount() {
    await this.findUser()
    if (this.props.userPage === false){
      this.props.history.push('/following')
    }
    window.scrollTo(0, 0)
  }

  addToFollow = async () =>{
    const userId = Number(localStorage.getItem('id'))
    const followId = this.props.userPage.id
    await addFollow(userId, followId)
    this.setState({
      following: true
    })
  }

  findUser = async () =>{
    const userName = this.props.match.params.name
    const id = localStorage.getItem('id')
    await this.props.getUserData(userName, id)
  }

  render(){
    const userInfo = this.props.userPage
    let renderButton = false
    if (userInfo){
      renderButton = userInfo.following || this.state.following
    }
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md="3">
              <img height="200" width="200" src={this.props.userPage.image} alt="user card" />
            </Col>
            <Col>
              <h1>{this.props.userPage.username}</h1>
              {renderButton ? <h4>✓ following</h4> : <div><Button onClick={this.addToFollow} size="md" color="info" >+ Follow</Button><br /></div>}
              <br />
              <p>Name: {this.props.userPage.firstname} {this.props.userPage.lastname}</p>
              <p>{this.props.userPage.aboutme}</p>
            </Col>
          </Row>
        </Container>
        <ActivityList />
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
