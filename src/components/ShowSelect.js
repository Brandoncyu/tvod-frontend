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
import { searchAllShows, clearSearch } from '../actions/showSelect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ShowSelect extends Component {
  componentDidMount() {
    this.props.clearSearch()
    window.scrollTo(0, 0)
  }

  searchShows = async (search) =>{
    await this.props.searchAllShows(search)
  }

  render(){
    const cards = this.props.shows.map(card=> card.show)
    return (
      <div>
        <Header />
        <Title />
        <Container>
          <Row>
            <Col>
              <SearchBar searchShows={this.searchShows} />
              <CardColumns className="my-4">
              {cards.map((cardInfo, index) => <SearchCards key={index} cardInfo={cardInfo} />)}
              </CardColumns>
            </Col>
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
    searchAllShows: bindActionCreators(searchAllShows, dispatch),
    clearSearch: bindActionCreators(clearSearch, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSelect)
