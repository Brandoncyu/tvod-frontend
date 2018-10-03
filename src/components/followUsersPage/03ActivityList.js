import React from 'react'
import { connect } from 'react-redux'
import ActivityListItem from './04ActivityListItem'
import {
  Container, Row, Col, ListGroup
} from 'reactstrap';



const ActivityList = (props) =>  {
  let episodes = []
  if (props.userPage.episodesReviews) episodes = props.userPage.episodesReviews
  return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1 className="text-center">Recent Activity</h1>
          </Col>
        </Row>
        <Row>
          <ListGroup>
            {episodes.map((element,index) => {
              return <ActivityListItem episodeInfo={element} key={index} />
            })}
          </ListGroup>
        </Row>
      </Container>
  )
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

export default connect(mapStateToProps)(ActivityList)
