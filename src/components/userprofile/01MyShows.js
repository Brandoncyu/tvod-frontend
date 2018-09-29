import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

const MyShows = ({  }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">My Favorite Shows</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">Other Shows I've Watched</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default MyShows
