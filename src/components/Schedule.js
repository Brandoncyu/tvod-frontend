import React, { Component } from 'react'
import Header from './Header'
import Upcoming from './schedule/01Upcoming'
import Newest from './schedule/02Newest'
import { getAllSeries } from '../actions/userAllSeries'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Schedule extends Component {
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
        <Newest />
        <Upcoming />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllSeries: bindActionCreators(getAllSeries, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Schedule)
