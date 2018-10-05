import React from 'react'
import { connect } from 'react-redux'
import ActivityListItem from './02ActivityListItem'
import {
  ListGroup
} from 'reactstrap';



const ActivityList = (props) =>  {
  let episodes = []
  if (props.userPage.episodesReviews.length ===0){
    return <p>No Recent Activity</p>
  } else {
    episodes = props.userPage.episodesReviews
  }


  return (
    <ListGroup className="stretch  scroll-vertical">
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
