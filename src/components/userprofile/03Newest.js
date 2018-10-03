import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import {date_sort_asc_episode_last} from '../_sortDate'
import { connect } from 'react-redux'

const Newest = (props) => {
  const newestEpisodes = props.allSeries.filter(element => element['episode_last'] && element.watched === true)
  const newestEpisodesSorted = newestEpisodes.sort(date_sort_asc_episode_last)
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Have You Seen The Newest Episodes?</h1>
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

export default connect(mapStateToProps)(Newest)
