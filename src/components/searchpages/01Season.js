import React, { Component } from 'react'
import Episode from './02Episode'
import {
  Button,
  ListGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import { addEpisode, addMultipleEpisodes } from '../../actions/userEpisodesWatched'
import { bindActionCreators } from 'redux'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';

class Season extends Component {
  constructor(props){
    super(props)

    this.state ={
      checkedAll: false
    }
  }

  checkedAllEpisodes = async () =>{
    const unwatchedEpisodes = this.props.season.filter(element => !this.props.watchedShowIds.includes(element['id']))
    unwatchedEpisodes.forEach(episode =>  {
      const epId = episode.id
      this.props.addToWatchedIds(epId)
    })
    const userId = Number(localStorage.getItem('id'))
    const tvId = this.props.showId
    const reducedUnwatchedEpisodes = unwatchedEpisodes.map(element =>{
      const newElement = {}
      newElement['user_id'] = userId
      newElement['tv_id'] = tvId
      newElement['tv_name'] = this.props.name
      newElement['image'] = this.props.image
      newElement['ep_id'] = element.id
      newElement['season_no'] = element.season
      newElement['ep_no'] = element.number
      newElement['ep_name'] = element.name
      newElement['watched'] = true
      return newElement
    })

    await this.props.addMultipleEpisodes(userId, tvId, reducedUnwatchedEpisodes)
    this.setState({
      checkedAll: true
    })
  }

  render(){
    if (!this.props.episodeInfoState.episodeIds && !this.props.episodeInfoState.episodeInfo){
      return <div><ReactSpinner /></div>
    }
    return (
      <div>
        {this.props.episodeInfoState.episodeIds && this.props.episodeInfoState.episodeInfo && <Button onClick={this.checkedAllEpisodes} color="primary" size="sm">
          + I have watched the whole season
        </Button>}
        <br />
        <ListGroup>
          { this.props.episodeInfoState.episodeIds && this.props.episodeInfoState.episodeInfo && this.props.season.map((episodeInfo, index) => {
            return <Episode
              key={index}
              showId={this.props.showId}
              name={this.props.name}
              image={this.props.image}
              checkedAll={this.state.checkedAll}
              checkedAllSeries={this.props.checkedAllSeries}
              addToWatchedIds={this.props.addToWatchedIds}
              episodeInfo={episodeInfo}
            />})
          }
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    episodeInfoState: state.episodeInfo.episodesWatched,
    watched: state.episodeInfo.episodesWatched.episodeIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    addEpisode: bindActionCreators(addEpisode, dispatch),
    addMultipleEpisodes: bindActionCreators(addMultipleEpisodes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Season)
