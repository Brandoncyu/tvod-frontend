import React from 'react'
import { connect } from 'react-redux'
import ActivityListItem from './04ActivityListItem'
import {
  ListGroup
} from 'reactstrap';



const ActivityList = (props) =>  {
  let episodes = []
  if (props.userPage.episodesReviews) episodes = props.userPage.episodesReviews

  return (
    <ListGroup className="stretch">
      {episodes.map((element,index) => {
        return <ActivityListItem
          key={index}
          episodeInfo={element}
        />
      })}
    </ListGroup>
  )
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

export default connect(mapStateToProps)(ActivityList)
