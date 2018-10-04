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
        {episodeInfo.image && <Col sm="1" className="mr-2"><img src={episodeInfo.image} height="100" alt="show card" /></Col>}
        <Col>
          <Row>
            <h4>watched <a href={showURL}>{episodeInfo['tv_name']}</a></h4>
          </Row>
          <Row>
            <p>season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b></p>
          </Row>
          {episodeInfo.rating &&
          <Row>
            <p>Rated {episodeInfo.rating} out of 5</p>
          </Row>}
          {episodeInfo.comments &&
          <Row>
            <p>Comments: "{episodeInfo.comments}"</p>
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
