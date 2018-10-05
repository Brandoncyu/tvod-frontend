import React, { Component } from 'react'
import Header from './Header'
import Title from './followUsers/01Title'
import UserCards from './followUsers/02UserCards'
import { getAllUsers, clearAllUsers } from '../actions/followUsers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { shuffle } from './_shuffle'
import {
  CardColumns, Container
} from 'reactstrap'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';


class FollowUsers extends Component {
  componentDidMount() {
    this.getUsers()
    window.scrollTo(0, 0)
  }

  componentWillUnmount(){
    this.props.clearAllUsers()
  }

  getUsers = async () =>{
    const userid = Number(localStorage.getItem('id'))
    await this.props.getAllUsers(userid)
  }

  render(){
    if (!this.props.users){
      return(<div>
        <Header />
        <Title />
        <ReactSpinner />
      </div>)
    }
    const usersInfo = shuffle(this.props.users)
    return (
      <div>
        <Header />
        <Title />
        <Container>
            <CardColumns>
              {usersInfo.map((userInfo, index) =>
                <UserCards
                  key={index}
                  userInfo={userInfo}
                />)}
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
    getAllUsers: bindActionCreators(getAllUsers, dispatch),
    clearAllUsers: bindActionCreators(clearAllUsers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUsers)
