import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

const Title = () => {
  return (
    <Container className="backcolor">
      <Row>
        <Col>
          <h1 className="my-4">Find Your Friends!</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Title
