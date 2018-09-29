import React from 'react'
import {
  Container,
  Row,
  Col,
  CardDeck
} from 'reactstrap'

const MyShows = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">My Favorite Shows</h1>
          <CardDeck>
          </CardDeck>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">Other Shows Ive Watched</h1>
          <CardDeck>
          </CardDeck>
        </Col>
      </Row>
    </Container>
  )
}

export default MyShows
