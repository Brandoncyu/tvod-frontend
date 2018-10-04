import React from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup
} from 'reactstrap'
import UpcomingListItem from './02UpcomingShows/UpcomingListItem'
import {date_sort_asc_episode_upcoming} from '../_sortDate'
import { connect } from 'react-redux'


const Upcoming = (props) => {
  const upcomingSeries = props.allSeries.filter(element => element.upcoming && element.watched === true)
  upcomingSeries.sort(date_sort_asc_episode_upcoming)
  
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Whats Upcoming?</h1>
        </Col>
      </Row>
      <Row>
        <ListGroup>
          {upcomingSeries.map((element, index) =>
            <UpcomingListItem
              key={index}
              showInfo={element}
              episodeInfo={element.upcoming}
            />)}
        </ListGroup>
      </Row>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    allSeries: state.allSeries.allSeries
  }
}

export default connect(mapStateToProps)(Upcoming)
