import React, { Component } from 'react'
import {
  Container, Row, Col, Form, FormGroup
} from 'reactstrap'
import Header from './Header'
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
    const today = moment(new Date()).format('YYYY MMMM Do, h:mm:ss a')
    this.setState({
      showInfo: showInfo,
      episodes: showInfo._embedded.episodes,
      airedEpisodes: showInfo._embedded.episodes.filter(episode => today > moment(episode.airstamp).format('YYYY MMMM Do, h:mm:ss a'))
    })
  }

  renderSeasons = (seasons) => {
    let result = ''
    for (var seasonNumber in seasons){
      result += `<FormGroup>${seasonNumber}</FormGroup>`
    }
    return result
  }

  render(){
    console.log('showInfo', this.state.showInfo)


    if (!this.state.showInfo){
      return <div>Pending</div>
    }

    const seasonSorted = this.state.airedEpisodes.reduce((sorted, episode)=> {
      if (!sorted[episode.season]){
        sorted[episode.season] = [episode]
      } else{
        sorted[episode.season].push(episode)
      }
      return sorted
    }, {})

    return (<div>
      <Header />
      <Container>
        <Row>
          <Col md='3'>
            { this.state.showInfo.image !== null && <img className="my-4" top width="100%" src={this.state.showInfo.image.original} alt="Card image" /> }
          </Col>
          <Col>
            <h1 className="my-4">{this.state.showInfo.name}</h1>
            <p className="summary" dangerouslySetInnerHTML={ { __html: this.state.showInfo.summary }}></p>
            <p><b>Genres</b>: {this.state.showInfo.genres.join(', ')}</p>
            <p><b>Episodes Aired</b>: {this.state.airedEpisodes.length}</p>
          </Col>
        </Row>
        <Row>
          <Form>
          {this.renderSeasons(seasonSorted)}
          </Form>
        </Row>
      </Container>
      </div>
    )
  }
}

export default searchPage
