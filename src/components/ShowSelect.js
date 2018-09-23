import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  CardColumns
} from 'reactstrap'
import Header from './Header'
import Title from './showselect/01Title'
import SearchBar from './showselect/02SearchBar'
import SearchCards from './showselect/03SearchCards'
import { searchAll, searchOne, searchOneWithEpisodes } from '../models/showSelect'

class ShowSelect extends Component {
  constructor(props){
    super(props)
    this.state = {
      shows: []
    }
  }

  searchShows = async (search) =>{
    const searchResult = await searchAll(search)
    this.setState({
      shows: searchResult
    })
  }

  render(){
    const cards = this.state.shows.map(card=> card.show)
    return (
      <div>
        <Header />
        <Title />
        <Container>
          <Row>
            <Col md="9">
              <SearchBar searchShows={this.searchShows} />
              <CardColumns className="my-4">
              {cards.map((cardInfo, index) => <SearchCards key={index} cardInfo={cardInfo} />)}
              </CardColumns>
            </Col>
            <Col>
              <h4>Your Shows</h4>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

export default ShowSelect
