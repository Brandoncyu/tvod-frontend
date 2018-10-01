import React, { Component } from 'react'
import Header from './Header'
import MyShows from './userprofile/01MyShows'
import Upcoming from './userprofile/02Upcoming'
import Newest from './userprofile/03Newest'
import FriendsSaying from './userprofile/04FriendsSaying'
import Suggestions from './userprofile/05Suggestions'
import { getAllSeries } from '../actions/userAllSeries'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserProfile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.addSeriesInfo()
  }

  addSeriesInfo = async() => {
    const userId = parseInt(localStorage.getItem('id'))
    await this.props.getAllSeries(userId)
  }

  render(){
    console.log(parseInt(localStorage.getItem('id')))
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

function mapDispatchToProps(dispatch){
  return {
    getAllSeries: bindActionCreators(getAllSeries, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UserProfile)
