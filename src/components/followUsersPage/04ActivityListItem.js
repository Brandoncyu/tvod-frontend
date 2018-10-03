import React from 'react'
import {
  ListGroupItem
} from 'reactstrap'

const ActivityListItem = (props) => {
  const episodeInfo = props.episodeInfo

  const newURL = /shows/ + episodeInfo['tv_name'].replace(/ /g, '+')
  const bothTrue = episodeInfo.rating !== null && episodeInfo.comments !== null
  const ratingTrue = episodeInfo.rating !== null && episodeInfo.comments === null
  const commentTrue = episodeInfo.rating === null && episodeInfo.comments !== null
  const bothNull = episodeInfo.rating === null && episodeInfo.comments === null

  if (bothNull){
    return (
      <ListGroupItem>
        Watched <a href={newURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>
      </ListGroupItem>
    )
  } else if (ratingTrue){
    return (<ListGroupItem>
      Gave a rating of {episodeInfo.rating} <a href={newURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>
    </ListGroupItem>)
  } else if (commentTrue){
    return (<ListGroupItem>
      Commented on <a href={newURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>: "{episodeInfo.comments}"
    </ListGroupItem>)
  } else if(bothTrue) {
    return (<ListGroupItem>
      Gave a rating of {episodeInfo.rating} <a href={newURL}>{episodeInfo['tv_name']}</a> season {episodeInfo['season_no']} episode {episodeInfo['ep_no']}: <b>{episodeInfo['ep_name']}</b>: <br />
      "{episodeInfo.comments}"
    </ListGroupItem>)
  }
}

export default ActivityListItem
