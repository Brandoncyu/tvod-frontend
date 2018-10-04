import React, { Component } from 'react'
import {
  Container, Row, Col, Button
} from 'reactstrap'
import Header from './Header'
import Season from './searchpages/01Season'
import Accordion from './accordion/Accordion';
import { searchShowsWithEpisodes, getTvId } from '../actions/searchPage'
import { checkIfWatched, addWatchedShow, changeFavoriteShow, deleteWatchedShow } from '../actions/userSeriesWatched'
import { getAllEpisodes, addEpisode, addMultipleEpisodes } from '../actions/userEpisodesWatched'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class searchPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      checkedAllSeries: false
    }
  }

  componentDidMount() {
    this.getShowandUserInfo()
    window.scrollTo(0, 0)
  }


  getShowandUserInfo = async () => {
    const userid = Number(localStorage.getItem('id'))
    await this.props.searchShowsWithEpisodes(this.props.match.params.name, userid)
    let tvId = await getTvId(this.props.match.params.name)
    await this.props.checkIfWatched(userid, tvId)
    await this.props.getAllEpisodes(userid, tvId)
    let watchedShowIds = []
    if (this.props.watchedInfo.episodes !== undefined) {
      watchedShowIds = this.props.watchedInfo.episodes.map(element=>element['ep_id'])
    }

    this.setState({
      watchedShowIds: watchedShowIds
    })
  }

  addWatched = async() =>{
    const userId = Number(localStorage.getItem('id'))
    const tvId = this.props.shows.showInfo.id
    const tvName = this.props.shows.showInfo.name
    const image = this.props.shows.showInfo.image.medium
    await this.props.addWatchedShow(userId, tvId, tvName, image)
  }

  deleteWatched = async() =>{
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

  addToWatchedIds = (id) =>{
    const newWatchedShowId = this.state.watchedShowIds
    newWatchedShowId.push(id)

    this.setState({
      watchedShowIds: newWatchedShowId
    })
  }

  checkedAllEpisodes = async() =>{
    const watchedEpisodeIds = this.state.watchedShowIds
    const airedEpisodes = this.props.shows.airedEpisodes
    const tvId = this.props.shows.showInfo.id
    const userId = Number(localStorage.getItem('id'))
    const unwatchedEpisodes = airedEpisodes.filter(element => !watchedEpisodeIds.includes(element['id']))
    const reducedUnwatchedEpisodes = unwatchedEpisodes.map(element =>{
      const newElement = {}
      newElement['user_id'] = userId
      newElement['tv_id'] = tvId
      newElement['tv_name'] = this.props.shows.showInfo.name
      newElement['image'] = this.props.shows.showInfo.image.medium
      newElement['ep_id'] = element.id
      newElement['season_no'] = element.season
      newElement['ep_no'] = element.number
      newElement['ep_name'] = element.name
      newElement['watched'] = true
      return newElement
    })

    await this.props.addMultipleEpisodes(userId, tvId, reducedUnwatchedEpisodes)

    this.setState({
      checkedAllSeries: true,
    })
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
            { this.props.watchedInfo.watched === false ?
              <Button onClick={this.addWatched} color="link">
                + Add to My Shows
              </Button> :
              <Button onClick={this.deleteWatched} color="link">
                - Remove From My Shows
              </Button> }
            { (this.props.watchedInfo.watched === true && this.props.watchedInfo.favorite === false) &&
              <Button onClick={this.changeFavorite} color="link">
                ☆ Add to My Favorite Shows
              </Button> }
            { (this.props.watchedInfo.watched === true && this.props.watchedInfo.favorite === true) &&
              <Button onClick={this.changeFavorite} color="link">
                ★ Remove from My Favorite Shows
              </Button> }
            <p className="summary" dangerouslySetInnerHTML={ { __html: this.props.shows.showInfo.summary }}></p>
            <p><b>Genres</b>: {this.props.shows.showInfo.genres.join(', ')}</p>
            <p><b>Episodes Aired</b>: {this.props.shows.airedEpisodes.length}</p>
            {this.props.watchedInfo.watched === true &&
              <Button color="primary" size="md"
              onClick={this.checkedAllEpisodes} >
                + I have watched the whole series
              </Button>}
          </Col>
        </Row>
        <Row>
          {this.props.watchedInfo.watched === true &&
            <div className="accordion">
              <h3>Which Episodes have you seen?</h3>
              <Accordion>
                {seasonSorted.map((season, index) => {
                  const seasonName = `Season ${index + 1}`
                  return <div className="seasonLabels"
                  label={seasonName}
                  key={index}>
                    <Season
                      key={index}
                      addEpisodeToDatabase={this.addEpisodeToDatabase}
                      showId={this.props.shows.showInfo.id}
                      name={this.props.shows.showInfo.name}
                      image={this.props.shows.showInfo.image.medium}
                      watchedShowIds={this.state.watchedShowIds}
                      addToWatchedIds={this.addToWatchedIds}
                      checkedAllSeries={this.state.checkedAllSeries}
                      season={season}
                      seasonNumber={index+1} 
                    />
                  </div>}
                )}
              </Accordion>
          </div>}
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
    addEpisode: bindActionCreators(addEpisode, dispatch),
    addMultipleEpisodes: bindActionCreators(addMultipleEpisodes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchPage)
