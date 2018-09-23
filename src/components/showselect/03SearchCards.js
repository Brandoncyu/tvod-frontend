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
      <Card body id={cardInfo.id}>
        <CardImg top width="100%" src={cardInfo.image.medium} alt="Card image" />
        <CardTitle>{cardInfo.name}</CardTitle>
        <CardText>{cardInfo.summary}</CardText>
        <Button>Watched!</Button>
      </Card>
    )
  }
}

export default searchCards
