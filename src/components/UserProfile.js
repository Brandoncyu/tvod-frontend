import React, { Component } from 'react'
import Header from './Header'
import MyShows from './userprofile/01MyShows'
import FriendsSaying from './userprofile/02FriendsSaying'
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
