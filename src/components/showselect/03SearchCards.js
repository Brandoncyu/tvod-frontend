import React from 'react'
import {
  Card, Button, CardTitle, CardText, CardImg
} from 'reactstrap'
import { Link } from 'react-router-dom'

const searchCards = (props) => {
  const cardInfo = props.cardInfo
  const newURL = '/shows/' + props.cardInfo.name.replace(/ /g, '+')

  return (
    <Card className="searchCards" body id={cardInfo.id}>
      { cardInfo.image !== null && <CardImg className="mb-4" top width="100%" src={cardInfo.image.medium} alt="Card image" /> }
      <CardTitle >{cardInfo.name}</CardTitle>
      <CardText className="summary" dangerouslySetInnerHTML={ { __html: cardInfo.summary }}></CardText>
      <Button tag={Link} to={newURL} color="primary">Watched!</Button>
    </Card>
  )
}

export default searchCards
