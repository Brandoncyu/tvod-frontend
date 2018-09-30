import React, { Component } from 'react'
import Episode from './02Episode'
import {
  Button,
  ListGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import { addEpisode } from '../../actions/userEpisodesWatched'
import { bindActionCreators } from 'redux'

class Season extends Component {
  constructor(props){
    super(props)

    this.state ={
      checkedAll: false
    }
  }

  checkedAllEpisodes = () =>{
    const unwatchedEpisodes = this.props.season.filter(element => !this.props.watched.includes(element['id']))
    unwatchedEpisodes.forEach(async episode =>  {
      const userId = parseInt(localStorage.getItem('id'))
      const tvId = this.props.showId
      const epId = episode.id
      const seasonNo = episode.season
      const epNo = episode.number
      const epName = episode.name
      await this.props.addEpisode(userId, tvId, epId, seasonNo, epNo, epName)
    })
    this.setState({
      checkedAll: true
    })
  }


  render(){
    console.log(this.props)
    return (
      <div>
        <Button onClick={this.checkedAllEpisodes} color="info" size="sm">+ Watched All</Button><br />
        <ListGroup>
        { this.props.season.map((episodeInfo, index) => {return <Episode key={index} showId={this.props.showId} checkedAll={this.state.checkedAll} checkedAllSeries={this.props.checkedAllSeries} episodeInfo={episodeInfo} />}) }
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    watched: state.episodeInfo.episodesWatched.episodeIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    addEpisode: bindActionCreators(addEpisode, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Season)
