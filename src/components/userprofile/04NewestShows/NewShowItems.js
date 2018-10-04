import React, { Component } from 'react'
import {
  Label,
  Input,
  ListGroupItem,
  Button,
  ButtonGroup,
  Row,
  Col
} from 'reactstrap'
import { connect } from 'react-redux'
import { addEpisode, addComment, addRating } from '../../../actions/userEpisodesWatched'
import { bindActionCreators } from 'redux'
const moment = require('moment')

class NewShowItems extends Component {
  constructor(props){
    super(props)

    this.state = {
      selected: false,
      comments: ''
    }

    this.addRatingAction = this.addRatingAction.bind(this);
  }

  addEpisodeAction = async() => {
    const userId = Number(localStorage.getItem('id'))
    const tvId = this.props.showInfo['tv_id']
    const tvName = this.props.showInfo['tv_name']
    const image = this.props.showInfo.image
    const epId = this.props.episodeInfo.id
    const seasonNo = this.props.episodeInfo.season
    const epNo = this.props.episodeInfo.number
    const epName = this.props.episodeInfo.name
    this.setState({
      selected: true
    })
    await this.props.addEpisode(userId, tvId, tvName, image, epId, seasonNo, epNo, epName)
  }

  addRatingAction = async (rating) => {
    const userId = Number(localStorage.getItem('id'))
    const tvId = this.props.showInfo['tv_id']
    const epId = this.props.episodeInfo.id
    this.setState({ rating });
    await this.props.addRating(userId, tvId, epId, rating)
  }

  addCommentAction = async(event) => {
    event.preventDefault()
    const userId = Number(localStorage.getItem('id'))
    const tvId = this.props.showInfo['tv_id']
    const epId = this.props.episodeInfo.id
    await this.props.addComment(userId, tvId, epId, this.state.comments)
  }


  render(){
    const airdate = moment(this.props.episodeInfo.airstamp).calendar()
    const abstraction = this.props.episodeInfo.hasWatched ===true || this.state.selected === true
    const showURL = '/shows/' + this.props.showInfo['tv_name'].replace(/ /g, '+')
    const showInfo = this.props.showInfo
    const episodeInfo = this.props.episodeInfo

    return (
      <ListGroupItem>
        <Row>
          <Col sm="2">
            {abstraction ? <h5>✓ Watched!</h5> : <h5><Button size="sm" color="info" onClick={this.addEpisodeAction} >+ Add To Watched!</Button></h5>}
            <img src={showInfo.image} height="200" alt="show card" />
          </Col>
          <Col>
            <h4>
              <a href={showURL}>{showInfo['tv_name']}</a>
            </h4>
            <h5>
              Season {episodeInfo.season} Episode {episodeInfo.number}: {episodeInfo.name}
            </h5>
            <small>
              Airdate: {airdate}
            </small>
            <br />
            <div className="summary"
              dangerouslySetInnerHTML={ { __html: episodeInfo.summary }}>
            </div>
          </Col>
        </Row>
        { this.state.selected && <div>
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
            <Input
              type="textarea"
              name="text"
              id="comment"
              value={this.state.comments}
              onChange={e => this.setState({comments: e.target.value})}
            />
          <Button color="info" onClick={this.addCommentAction} size="sm">
            Submit Comment
          </Button>
        </div>}
      </ListGroupItem>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    addEpisode: bindActionCreators(addEpisode, dispatch),
    addComment: bindActionCreators(addComment, dispatch),
    addRating: bindActionCreators(addRating, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(NewShowItems)
