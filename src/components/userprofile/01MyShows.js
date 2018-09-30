import React from 'react'
import {
  Container,
  Row,
  Col,
  CardDeck
} from 'reactstrap'
import {shuffle} from './01MyShows/shuffle'
import ShowCards from './01MyShows/ShowCards'
import { connect } from 'react-redux'


const MyShows = (props) => {
  const shuffledSeries = shuffle(props.allSeries)
  const favorite = shuffledSeries.filter(series => series.favorite === true)
  const nonFavorite = shuffledSeries.filter(series => series.favorite !== true)

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">My Favorite Shows</h1>
          <CardDeck className="show-deck">
            {favorite.map((element, index) =>{
              return <ShowCards showInfo={element} key={index}/>
            })}
          </CardDeck>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">Other Shows Ive Watched</h1>
          <CardDeck className="show-deck">
            {nonFavorite.map((element, index) =>{
              return <ShowCards showInfo={element} key={index}/>
            })}
          </CardDeck>
        </Col>
      </Row>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    allSeries: state.allSeries.allSeries
  }
}

export default connect(mapStateToProps)(MyShows)
