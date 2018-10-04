import React from 'react'
import { ListGroup } from 'reactstrap'
import UpcomingListItem from './03UpcomingShows/UpcomingListItem'
import {date_sort_asc_episode_upcoming} from '../_sortDate'
import { connect } from 'react-redux'


const Upcoming = (props) => {
  const upcomingSeries = props.allSeries.filter(element => element.upcoming && element.watched === true)
  upcomingSeries.sort(date_sort_asc_episode_upcoming)

  return (
    <ListGroup className="stretch">
      {upcomingSeries.map((element, index) =>
        <UpcomingListItem
          key={index}
          showInfo={element}
          episodeInfo={element.upcoming}
        />)}
    </ListGroup>
  )
}

function mapStateToProps(state) {
  return {
    allSeries: state.allSeries.allSeries
  }
}

export default connect(mapStateToProps)(Upcoming)
