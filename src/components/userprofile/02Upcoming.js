import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import {date_sort_asc_episode_upcoming} from '../_sortDate'
import { connect } from 'react-redux'

const Upcoming = (props) => {
  const upcomingSeries = props.allSeries.filter(element => element['episode_upcoming'] && element.watched === true)

  const upcomingSeriesSorted = upcomingSeries.sort(date_sort_asc_episode_upcoming)
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Whats Upcoming?</h1>
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

export default connect(mapStateToProps)(Upcoming)
