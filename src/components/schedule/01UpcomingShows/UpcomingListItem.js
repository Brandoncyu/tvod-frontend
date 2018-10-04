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
        <Col sm="2">
          <img src={showInfo.image} height="200" alt="show card" />
        </Col>
        <Col>
          <h4><a href={showURL}>{showInfo['tv_name']}</a></h4>
          <h5>Season {episodeInfo.season}, Episode {episodeInfo.number}: {episodeInfo.name}</h5>
          <medium>airs <b>{airstamp}</b></medium>
          <br /><br />
          <div className="summary" dangerouslySetInnerHTML={ { __html: episodeInfo.summary }}>
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default UpcomingListItem
