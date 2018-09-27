import React, { Component } from 'react'
import {
  Container, Row, Col, Form, Button
} from 'reactstrap'
import Header from './Header'
import Season from './searchpages/01Season'
import Accordion from './accordion/Accordion';
import { searchShowsWithEpisodes } from '../actions/showSelect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { searchOneWithEpisodes } from '../models/showSelect'



class searchPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      // showInfo: '',
      // episodes: [],
      // airedEpisodes: []
    }
  }

  componentDidMount(){
    this.getShowInfo()
  }

  // getShowInfo = async ()=> {
  //   const showInfo = await searchOneWithEpisodes(this.props.match.params.name)
  //   const today = moment(new Date()).format('YYYY-MM-D')
  //   this.setState({
  //     showInfo: showInfo,
  //     episodes: showInfo._embedded.episodes,
  //     airedEpisodes: showInfo._embedded.episodes.filter(episode => today > episode.airdate),
  //     user_id: parseInt(localStorage.getItem('id')),
  //     tv_id: showInfo.id,
  //     tv_name: showInfo.name,
  //     watched: false,
  //     favorite: false,
  //   })
  // }

  getShowInfo = async () => {
    const userid = parseInt(localStorage.getItem('id'))
    await this.props.searchShowsWithEpisodes(this.props.match.params.name, userid)
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
    console.log(this.props)
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
    console.log('seasonsorted', seasonSorted)
    return (<div>
      <Header />
      <Container>
        <Row>
          <Col md='3'>
            { this.props.shows.showInfo.image !== null && <img className="my-4" width="100%" src={this.props.shows.showInfo.image.original} alt="Card" /> }
          </Col>
          <Col>
            <h1 className="mt-4">{this.props.shows.showInfo.name}</h1>
            { this.props.shows.watched === false ? <Button onClick={this.changeWatched} color="link">+ Add to My Shows</Button> : <Button onClick={this.changeWatched} color="link">- Remove From My Shows</Button> }
            { (this.state.watched === true && this.state.favorite === false) && <Button onClick={this.changeFavorite} color="link">☆ Add to My Favorite Shows</Button> }
            { (this.props.watched === true && this.state.favorite === true) && <Button onClick={this.changeFavorite} color="link">★ Remove from My Favorite Shows</Button> }
            <p className="summary" dangerouslySetInnerHTML={ { __html: this.props.shows.showInfo.summary }}></p>
            <p><b>Genres</b>: {this.props.shows.showInfo.genres.join(', ')}</p>
            <p><b>Episodes Aired</b>: {this.props.shows.airedEpisodes.length} episodes</p>
          </Col>
        </Row>
        <Row>
          {this.props.shows.watched === true &&<div> <h3>Which Episodes have you seen?</h3>
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
    shows: state.search.shows
  }
}

function mapDispatchToProps(dispatch){
  return{
    searchShowsWithEpisodes: bindActionCreators(searchShowsWithEpisodes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchPage)
