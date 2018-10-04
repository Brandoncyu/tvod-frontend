import React from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup
} from 'reactstrap'
import {date_sort_asc_episode_last} from '../_sortDate'
import NewShowItems from './02NewestShows/NewShowItems'
import { connect } from 'react-redux'

const Newest = (props) => {
  const newestEpisodes = props.allSeries.filter(element =>
    element.last && element.watched === true)
  newestEpisodes.sort(date_sort_asc_episode_last)

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Have You Seen The Newest Episodes?</h1>
        </Col>
      </Row>
      <Row>
        <ListGroup className="stretch">
          {newestEpisodes.map((element, index) =>
            <NewShowItems
              key={index}
              showInfo={element}
              episodeInfo={element.last}
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

export default connect(mapStateToProps)(Newest)
