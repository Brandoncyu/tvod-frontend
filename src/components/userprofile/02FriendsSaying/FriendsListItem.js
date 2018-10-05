import React from 'react'
import {
  ListGroupItem, Row, Col
} from 'reactstrap'

const FriendsListItem = (props) => {
  const episodeInfo = props.episodeInfo
  const userInfo = props.userInfo
  const showURL = '/shows/' + episodeInfo['tv_name'].replace(/ /g, '+')
  const userURL = '/following/' + userInfo['username']


  return (
    <ListGroupItem className="backGrey">
      <Row>
        <Col sm="1" className="mr-4">
          <img src={userInfo.image} className="rounded-circle" height="100" alt="user card" />{' '}
        </Col>
        {episodeInfo.image && <Col sm="1" className="mr-4"><img src={episodeInfo.image} height="100" alt="show card" /></Col>}
        <Col>
          <Row>
            <h4><a href={userURL}>{userInfo['username']}</a> watched <a href={showURL}>{episodeInfo['tv_name']}</a> </h4>
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
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default FriendsListItem
