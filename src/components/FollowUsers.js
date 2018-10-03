import React, { Component } from 'react'
import Header from './Header'
import Title from './followUsers/01Title'
import UserCards from './followUsers/02UserCards'
import { getAllUsers } from '../actions/followUsers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { shuffle } from './_shuffle'
import {
  CardColumns, Container
} from 'reactstrap'


class FollowUsers extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.getUsers()
    window.scrollTo(0, 0)
  }

  getUsers = async () =>{
    const userid = Number(localStorage.getItem('id'))
    await this.props.getAllUsers(userid)
  }

  render(){
    const usersInfo = shuffle(this.props.users)
    return (
      <div>
        <Header />
        <Title />
        <Container>
            <CardColumns>
              {usersInfo.map((userInfo, index) => <UserCards userInfo={userInfo} key={index} />)}
            </CardColumns>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
  }
}

function mapDispatchToProps(dispatch){
  return{
    getAllUsers: bindActionCreators(getAllUsers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUsers)
