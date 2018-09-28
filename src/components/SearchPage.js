import React, { Component } from 'react'
import {
  Container, Row, Col, Form, Button
} from 'reactstrap'
import Header from './Header'
import Season from './searchpages/01Season'
import Accordion from './accordion/Accordion';
import { searchShowsWithEpisodes, getTvId } from '../actions/searchPage'
import { checkIfWatched, addWatchedShow, changeFavoriteShow, deleteWatchedShow } from '../actions/userSeriesWatched'
import { getAllEpisodes, addEpisode } from '../actions/userEpisodesWatched'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class searchPage extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.getShowandUserInfo()
  }


  getShowandUserInfo = async () => {
    const userid = parseInt(localStorage.getItem('id'))
    await this.props.searchShowsWithEpisodes(this.props.match.params.name, userid)
    let tvId = await getTvId(this.props.match.params.name)
    await this.props.checkIfWatched(userid, tvId)
    await this.props.getAllEpisodes(userid, tvId)
  }


  addWatched = async() =>{
    const userId = parseInt(localStorage.getItem('id'))
    const tvId = this.props.shows.showInfo.id
    const tvName = this.props.shows.showInfo.name
    const image = this.props.shows.showInfo.image.medium
    await this.props.addWatchedShow(userId, tvId, tvName, image)
  }

  deleteWatched = async() =>{
    const watched = false
    const tvId = this.props.watchedInfo.tv_id
    const userId = this.props.watchedInfo.user_id
    await this.props.deleteWatchedShow(userId, tvId)
  }

  changeFavorite= async() =>{
    const favorite = !this.props.watchedInfo.favorite
    const tvId = this.props.watchedInfo.tv_id
    const userId = this.props.watchedInfo.user_id
    await this.props.changeFavoriteShow(userId, tvId, favorite)
  }

  render(){
    if (!this.props.shows.showInfo){
      return <div>Pending</div>
    }

    const seasonSorted = this.props.shows.airedEpisodes.reduce((sorted, episode)=> {
      if (!sorted[episode.season-1]){
        sorted[episode.season-1] = [episode]
      } else{
        sorted[episode.season-1].push(episode)
      }
      return sorted
    }, [])

    return (<div>
      <Header />
      <Container>
        <Row>
          <Col md='3'>
            { this.props.shows.showInfo.image !== null && <img className="my-4" width="100%" src={this.props.shows.showInfo.image.original} alt="Card" /> }
          </Col>
          <Col>
            <h1 className="mt-4">{this.props.shows.showInfo.name}</h1>
            { this.props.watchedInfo.watched === false ? <Button onClick={this.addWatched} color="link">+ Add to My Shows</Button> : <Button onClick={this.deleteWatched} color="link">- Remove From My Shows</Button> }
            { (this.props.watchedInfo.watched === true && this.props.watchedInfo.favorite === false) && <Button onClick={this.changeFavorite} color="link">☆ Add to My Favorite Shows</Button> }
            { (this.props.watchedInfo.watched === true && this.props.watchedInfo.favorite === true) && <Button onClick={this.changeFavorite} color="link">★ Remove from My Favorite Shows</Button> }
            <p className="summary" dangerouslySetInnerHTML={ { __html: this.props.shows.showInfo.summary }}></p>
            <p><b>Genres</b>: {this.props.shows.showInfo.genres.join(', ')}</p>
            <p><b>Episodes Aired</b>: {this.props.shows.airedEpisodes.length}</p>
          </Col>
        </Row>
        <Row>
          {this.props.watchedInfo.watched === true &&<div> <h3>Which Episodes have you seen?</h3>
          <Form>
            <Accordion>
              {seasonSorted.map((season, index) => {
                const seasonName = `Season ${index + 1}`
                return <div className="seasonLabels" label={seasonName} key={index}><Season addEpisodeToDatabase={this.addEpisodeToDatabase} showId={this.props.shows.showInfo.id} key={index} season={season} seasonNumber={index+1} /></div>}
              )}
            </Accordion>
          </Form></div>}
        </Row>
      </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shows: state.showInfo.shows,
    watchedInfo: state.watchedInfo.userWatched,
    episodeInfo: state.episodeInfo.episodesWatched.episodeInfo,
    episodeIds: state.episodeInfo.episodesWatched.episodeIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    searchShowsWithEpisodes: bindActionCreators(searchShowsWithEpisodes, dispatch),
    checkIfWatched: bindActionCreators(checkIfWatched, dispatch),
    addWatchedShow: bindActionCreators(addWatchedShow, dispatch),
    deleteWatchedShow: bindActionCreators(deleteWatchedShow, dispatch),
    changeFavoriteShow: bindActionCreators(changeFavoriteShow, dispatch),
    getAllEpisodes: bindActionCreators(getAllEpisodes, dispatch),
    addEpisode: bindActionCreators(addEpisode, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchPage)
