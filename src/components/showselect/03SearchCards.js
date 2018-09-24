import React, { Component } from 'react'
import {
  Card, CardBody, Button, CardTitle, CardText, CardImg
} from 'reactstrap'

class searchCards extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const cardInfo = this.props.cardInfo
    console.log(cardInfo)

    return (
      <Card className="searchCards" body id={cardInfo.id}>
        { cardInfo.image !== null && <CardImg className="mb-4" top width="100%" src={cardInfo.image.medium} alt="Card image" /> }
        <CardTitle >{cardInfo.name}</CardTitle>
        <CardText className="summary" dangerouslySetInnerHTML={ { __html: cardInfo.summary }}></CardText>
        <Button color="primary">Watched!</Button>
      </Card>
    )
  }
}

export default searchCards
