import React, { Component } from 'react'
import {
  Label,
  Input,
  ListGroupItem,
  Button,
  ButtonGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import { addEpisode, addComment, addRating } from '../../actions/userEpisodesWatched'
import { bindActionCreators } from 'redux'
const moment = require('moment')

class Episode extends Component {
  constructor(props){
    super(props)

    this.state ={
      selected: false,
      comments: ''
    }

    this.addRatingAction = this.addRatingAction.bind(this);
  }

  componentDidMount(){
    const episodeInfoSpread = this.props.episodeInfoRender.find(element => element['ep_id'] === this.props.episodeInfo.id)


    if (episodeInfoSpread !== undefined && episodeInfoSpread['comments']) {
      this.setState({
        comments: episodeInfoSpread['comments']
      })
    }
    if (episodeInfoSpread !== undefined && episodeInfoSpread['rating'] !== undefined ) {
      this.setState({
        rating: episodeInfoSpread['rating']
      })
    }
  }

  addEpisodeAction = async() => {
    const userId = parseInt(localStorage.getItem('id'))
    const tvId = this.props.showId
    const epId = this.props.episodeInfo.id
    const seasonNo = this.props.episodeInfo.season
    const epNo = this.props.episodeInfo.number
    const epName = this.props.episodeInfo.name
    this.setState({
      selected: true
    })
    await this.props.addEpisode(userId, tvId, epId, seasonNo, epNo, epName)
  }

  addRatingAction = async (rating) => {
    const userId = parseInt(localStorage.getItem('id'))
    const tvId = this.props.showId
    const epId = this.props.episodeInfo.id
    this.setState({ rating });
    await this.props.addRating(userId, tvId, epId, rating)
  }

  addCommentAction = async(event) => {
    event.preventDefault()
    const userId = parseInt(localStorage.getItem('id'))
    const tvId = this.props.showId
    const epId = this.props.episodeInfo.id
    await this.props.addComment(userId, tvId, epId, this.state.comments)
  }

  checkId = this.props.episodeIds.includes(this.props.episodeInfo.id)
  episodeInfoSpread = this.props.episodeInfoRender.find(element => element['ep_id'] === this.props.episodeInfo.id)

  render(){
    const airdate = moment(this.props.episodeInfo.airdate).format('MMMM Do YYYY')
    const abstraction = this.checkId || this.state.selected === true || this.props.checkedAll || this.props.checkedAllSeries
    return (
      <ListGroupItem>
        {abstraction ? <h5>✓{' '}Episode {this.props.episodeInfo.number}: {this.props.episodeInfo.name}</h5> : <h5><Button size="sm" color="info" onClick={this.addEpisodeAction} >+</Button>{' '}Episode {this.props.episodeInfo.number}: {this.props.episodeInfo.name}</h5>}
      <small>Airdate: {airdate}</small><br />
      <div className="summary" dangerouslySetInnerHTML={ { __html: this.props.episodeInfo.summary }}></div>
      { abstraction && <div>
        <Label htmlFor="rating">Episode rating</Label> {' '}
          <ButtonGroup size ="sm" id="rating">
            <Button color="info" onClick={() => this.addRatingAction(1)} active={this.state.rating === 1}>1</Button>
            <Button color="info" onClick={() => this.addRatingAction(2)} active={this.state.rating === 2}>2</Button>
            <Button color="info" onClick={() => this.addRatingAction(3)} active={this.state.rating === 3}>3</Button>
            <Button color="info" onClick={() => this.addRatingAction(4)} active={this.state.rating === 4}>4</Button>
            <Button color="info" onClick={() => this.addRatingAction(5)} active={this.state.rating === 5}>5</Button>
          </ButtonGroup>
        <br />
        <Label htmlFor="comment">Comments</Label>
          <Input type="textarea" name="text" id="comment" value={this.state.comments} onChange={e => this.setState({comments: e.target.value})} />
        <Button color="info" onClick={this.addCommentAction} size="sm">Submit Comment</Button></div>
      }
      </ListGroupItem>
    )
  }
}

function mapStateToProps(state) {
  return {
    episodeInfoRender: state.episodeInfo.episodesWatched.episodeInfo,
    episodeIds: state.episodeInfo.episodesWatched.episodeIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    addEpisode: bindActionCreators(addEpisode, dispatch),
    addComment: bindActionCreators(addComment, dispatch),
    addRating: bindActionCreators(addRating, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episode)
