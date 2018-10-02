import React, { Component } from 'react'
import {
  Card, Button, CardTitle, CardText, CardImg, CardBody, CardSubtitle, CardImgOverlay, Row, Col
} from 'reactstrap'
import { addFollow } from '../../models/followUsers'
import { Link } from 'react-router-dom'
import { shuffle } from '../_shuffle'

class UserCards extends Component{
  constructor(props){
    super(props)

    this.state = {
      following: false,
    }
  }

  addToFollow = async () =>{
    const userId = parseInt(localStorage.getItem('id'))
    const followId = this.props.userInfo.id
    await addFollow(userId, followId)
    this.setState({
      following: true
    })
  }

  render (){
    const userInfo = this.props.userInfo
    const renderButton = userInfo.following || this.state.following
    const favoriteShowsArray = shuffle(userInfo.favorites)
    let favoriteShows = ''
    if (favoriteShowsArray.length === 0){
      favoriteShows += 'None'
    } else if (favoriteShowsArray.length === 1){
      favoriteShows += favoriteShowsArray[0]
    } else if (favoriteShowsArray.length === 2) {
      favoriteShows += favoriteShowsArray[0] + ', ' + favoriteShowsArray[1]
    } else if (favoriteShowsArray.length > 2){
      favoriteShows += favoriteShowsArray[0] + ', ' + favoriteShowsArray[1] + ', ' + favoriteShowsArray[2]
    }

    return (
      <Card className="userCards" >
        <CardBody>
          <Row>
            <Col className="d-flex flex-row">
            <CardTitle>{userInfo.username}</CardTitle>
            </Col>
            <Col className="d-flex flex-row-reverse">
              {renderButton ? <p>✓ following</p> : <h5><Button onClick={this.addToFollow} size="sm" color="info" >+ follow</Button></h5>}
            </Col>
          </Row>
          <br />
          <CardText>"{userInfo.aboutme}"</CardText>
          
          <CardText>Favorite Shows: {favoriteShows}</CardText>
        </CardBody>
        <CardImg top width="100%" src={userInfo.image} alt="Card image cap" />
      </Card>
    )
  }
}

export default UserCards
