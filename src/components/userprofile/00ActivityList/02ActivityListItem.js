import React from 'react'
import {
  ListGroupItem, Row, Col
} from 'reactstrap'
import Moment from 'moment';

const ActivityListItem = (props) => {
  const episodeInfo = props.episodeInfo
  const showURL = '/shows/' + episodeInfo['tv_name'].replace(/ /g, '+')
  const when = Moment(episodeInfo['updated_at']).calendar()

  return (
    <ListGroupItem>
      <Row>
        {episodeInfo.image && <Col sm="1" className="mr-2 d-flex align-items-center"><img src={episodeInfo.image} height="50" alt="show card" /></Col>}
        <Col>
          <Row>
            <small>watched <a href={showURL}>{episodeInfo['tv_name']}</a></small>
          </Row>
          <Row>
            <small>season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b></small>
          </Row>
          {episodeInfo.rating &&
          <Row>
            <small>Rated {episodeInfo.rating} out of 5</small>
          </Row>}
          {episodeInfo.comments &&
          <Row>
            <small>Comments: "{episodeInfo.comments}"</small>
          </Row>}
          <Row>
            <small>{when}</small>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default ActivityListItem
