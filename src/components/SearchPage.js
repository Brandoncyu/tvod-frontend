import React, { Component } from 'react'
import {
  Container, Row, Col, Form, Button
} from 'reactstrap'
import Header from './Header'
import Season from './searchpages/01Season'
import Accordion from './accordion/Accordion';
import { searchShowsWithEpisodes, getTvId } from '../actions/searchPage'
import { checkIfWatched } from '../actions/userWatchedInfo'
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
  }


  changeWatched = () =>{
    // this.setState({
    //   watched: !this.state.watched
    // })
  }

  changeFavorite= () =>{
    // this.setState({
    //   favorite: !this.state.favorite
    // })
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
            { this.props.watchedInfo.watched === false ? <Button onClick={this.changeWatched} color="link">+ Add to My Shows</Button> : <Button onClick={this.changeWatched} color="link">- Remove From My Shows</Button> }
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
                return <div className="seasonLabels" label={seasonName}><Season showId={this.props.shows.showInfo.id} key={index} season={season} seasonNumber={index+1} /></div>}
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
    watchedInfo: state.watchedInfo.userWatched
  }
}

function mapDispatchToProps(dispatch){
  return{
    searchShowsWithEpisodes: bindActionCreators(searchShowsWithEpisodes, dispatch),
    checkIfWatched: bindActionCreators(checkIfWatched, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchPage)
