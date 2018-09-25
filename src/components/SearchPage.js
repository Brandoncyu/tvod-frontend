import React, { Component } from 'react'
import {
  Container, Row, Col, Form, Button, ListGroup
} from 'reactstrap'
import Header from './Header'
import Season from './searchpages/01Season'
import Accordion from './accordion/Accordion';
import { searchOneWithEpisodes } from '../models/showSelect'
const moment = require('moment')


class searchPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      showInfo: '',
      episodes: [],
      airedEpisodes: []
    }
  }

  componentDidMount(){
    this.getShowInfo()
  }

  getShowInfo = async ()=> {
    const showInfo = await searchOneWithEpisodes(this.props.match.params.name)
    const today = moment(new Date()).format('YYYY-MM-D')
    this.setState({
      showInfo: showInfo,
      episodes: showInfo._embedded.episodes,
      airedEpisodes: showInfo._embedded.episodes.filter(episode => today > episode.airdate),
      user_id: parseInt(localStorage.getItem('id')),
      tv_id: showInfo.id,
      tv_name: showInfo.name,
      watched: false,
      favorite: false,
    })
  }

  changeWatched = () =>{
    this.setState({
      watched: !this.state.watched
    })
  }

  render(){
    if (!this.state.showInfo){
      return <div>Pending</div>
    }

    const seasonSorted = this.state.airedEpisodes.reduce((sorted, episode)=> {
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
            { this.state.showInfo.image !== null && <img className="my-4" width="100%" src={this.state.showInfo.image.original} alt="Card image" /> }
          </Col>
          <Col>
            <h1 className="mt-4">{this.state.showInfo.name}</h1>
            { this.state.watched == false ? <Button onClick={this.changeWatched} color="link">+ Add to My Shows</Button> : <Button onClick={this.changeWatched} color="link">- Remove From My Shows</Button> }
            <p className="summary" dangerouslySetInnerHTML={ { __html: this.state.showInfo.summary }}></p>
            <p><b>Genres</b>: {this.state.showInfo.genres.join(', ')}</p>
            <p><b>Episodes Aired</b>: {this.state.airedEpisodes.length}</p>
          </Col>
        </Row>
        <Row>
          {this.state.watched == true &&<div> <h3>Which Episodes have you seen?</h3>
          <Form>
            <Accordion>
              {seasonSorted.map((season, index) => {
                const seasonName = `Season ${index + 1}`
                return <div className="seasonLabels" label={seasonName}><Season showId={this.state.showInfo.id} key={index} season={season} seasonNumber={index+1} /></div>}
              )}
            </Accordion>
          </Form></div>}
        </Row>
      </Container>
      </div>
    )
  }
}

export default searchPage
