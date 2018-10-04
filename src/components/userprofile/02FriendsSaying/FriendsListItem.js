import React from 'react'
import {
  ListGroupItem
} from 'reactstrap'

const FriendsListItem = (props) => {
  const episodeInfo = props.episodeInfo
  const userInfo = props.userInfo
  const showURL = '/shows/' + episodeInfo['tv_name'].replace(/ /g, '+')
  const userURL = '/following/' + userInfo['username']


  const bothTrue = episodeInfo.rating !== null && episodeInfo.comments !== null
  const ratingTrue = episodeInfo.rating !== null && episodeInfo.comments === null
  const commentTrue = episodeInfo.rating === null && episodeInfo.comments !== null
  const bothNull = episodeInfo.rating === null && episodeInfo.comments === null

  if (bothNull){
    return (
      <ListGroupItem>{' '}<img src={userInfo.image} height="40" alt="user card" />{' '}{episodeInfo.image && <img src={episodeInfo.image} height="40" alt="show card" />}{' '}
        <a href={userURL}>{userInfo['username']}</a> watched <a href={showURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>
      </ListGroupItem>
    )
  } else if (ratingTrue){
    return (<ListGroupItem>{' '}<img src={userInfo.image} height="40" alt="user card" />{' '}{episodeInfo.image && <img src={episodeInfo.image} height="40" alt="show card" />}{' '}
      <a href={userURL}>{userInfo['username']}</a> gave a rating of {episodeInfo.rating} for <a href={showURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>
    </ListGroupItem>)
  } else if (commentTrue){
    return (<ListGroupItem><img src={userInfo.image} height="40" alt="user card" />{' '}{episodeInfo.image && <img src={episodeInfo.image} height="40" alt="show card" />}{' '}
      <a href={userURL}>{userInfo['username']}</a> commented on <a href={showURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>: "{episodeInfo.comments}"
    </ListGroupItem>)
  } else if(bothTrue) {
    return (<ListGroupItem><img src={userInfo.image} height="40" alt="user card" />{' '}{episodeInfo.image && <img src={episodeInfo.image} height="40" alt="show card" />}{' '}
      <a href={userURL}>{userInfo['username']}</a> gave a rating of {episodeInfo.rating} for <a href={showURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>: "{episodeInfo.comments}"
    </ListGroupItem>)
  }
}

export default FriendsListItem
