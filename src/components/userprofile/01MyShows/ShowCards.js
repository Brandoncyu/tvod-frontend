import React from 'react'
import {
  Card, CardTitle, CardText, CardImg, Progress
} from 'reactstrap'
import { Link } from 'react-router-dom'

const ShowCards = (props) => {
  const showInfo = props.showInfo
  const newURL = '/shows/' + showInfo['tv_name'].replace(/ /g, '+')
  const watchedPercentage = Number((showInfo['episodes_watched'] / showInfo['episode_count']) * 100)
  return (
    <Card className="backGrey showCards mx-1" tag={Link} to={newURL}>
      { showInfo.image !== null && <CardImg className="mb-4" top width="100%" src={showInfo.image} alt="Card image" /> }
      <CardTitle className="text-center">
        {showInfo['tv_name']}
      </CardTitle>
      <CardText className="text-center">
        {showInfo['episodes_watched']} / {showInfo['episode_count']}
      </CardText>
      <Progress value={watchedPercentage} />
    </Card>
  )
}

export default ShowCards
