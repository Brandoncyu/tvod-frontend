import React from 'react'
import {
  ListGroupItem, Row, Col
} from 'reactstrap'
import Moment from 'moment';

const UpcomingListItem = (props) => {
  const showInfo = props.showInfo
  const episodeInfo = props.episodeInfo
  const showURL = '/shows/' + showInfo['tv_name'].replace(/ /g, '+')

  const airstamp = Moment(episodeInfo.airstamp).calendar()

  return (
    <ListGroupItem>
      <Row>
        <Col sm="1">
          <img src={showInfo.image} height="100" alt="show card" />
        </Col>
        <Col>
          <a href={showURL}>{showInfo['tv_name']}</a> airs <b>{airstamp}</b><br />
          <b>{episodeInfo.name}</b><br />
          Season {episodeInfo.season}, Episode {episodeInfo.number}<br />
          <div className="summary" dangerouslySetInnerHTML={ { __html: episodeInfo.summary }}></div>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default UpcomingListItem
