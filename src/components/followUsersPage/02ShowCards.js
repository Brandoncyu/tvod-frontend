import React from 'react'
import {
  Card, CardTitle, CardText, CardImg, Progress
} from 'reactstrap'

const ShowCards = (props) => {
  const showInfo = props.showInfo

  const newURL = /shows/ + showInfo['tv_name'].replace(/ /g, '+')
  const watchedPercentage = parseInt((showInfo['episodes_watched'] / showInfo['episode_count']) * 100)
  return (
    <Card className="showCards mx-1">
      { showInfo.image !== null && <CardImg className="mb-4" top width="100%" src={showInfo.image} alt="Card image" /> }
      <CardTitle className="text-center">{showInfo['tv_name']}</CardTitle>
      <CardText className="text-center">{showInfo['episodes_watched']} / {showInfo['episode_count']}</CardText>
      <Progress value={watchedPercentage} />
    </Card>
  )
}

export default ShowCards
