import React, { Component } from 'react'
import Header from './Header'
import MyShows from './userprofile/01MyShows'
import Upcoming from './userprofile/02Upcoming'
import Newest from './userprofile/03Newest'
import FriendsSaying from './userprofile/04FriendsSaying'
import { getAllSeries } from '../actions/userAllSeries'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserProfile extends Component {
  componentDidMount(){
    this.addSeriesInfo()
    window.scrollTo(0, 0)
  }

  addSeriesInfo = async() => {
    const userId = Number(localStorage.getItem('id'))
    await this.props.getAllSeries(userId)
  }

  render(){
    return (
      <div>
        <Header />
        <MyShows />
        <FriendsSaying />
        <Upcoming />
        <Newest />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllSeries: bindActionCreators(getAllSeries, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UserProfile)
