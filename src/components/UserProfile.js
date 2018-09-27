import React, { Component } from 'react'
import Header from './Header'
import MyShows from './userprofile/01MyShows'
import Upcoming from './userprofile/02Upcoming'
import Newest from './userprofile/03Newest'
import FriendsSaying from './userprofile/04FriendsSaying'
import Suggestions from './userprofile/05Suggestions'
import { connect } from 'react-redux'

class UserProfile extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div>
        <Header />
        <MyShows />
        <Upcoming />
        <Newest />
        <FriendsSaying />
        <Suggestions />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(UserProfile)
