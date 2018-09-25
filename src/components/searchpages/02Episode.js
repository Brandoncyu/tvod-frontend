import React, { Component } from 'react'
import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  ListGroupItem,
  Button,
  ButtonGroup
} from 'reactstrap'
const moment = require('moment')

class Episode extends Component {
  constructor(props){
    super(props)

    this.state ={
      user_id: parseInt(localStorage.getItem('id')),
      tv_id: this.props.showId,
      ep_id: this.props.episodeInfo.id,
      season_no: this.props.episodeInfo.season,
      ep_no: this.props.episodeInfo.number,
      ep_name: this.props.episodeInfo.name,
      watched: true
    }

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rating) {
   this.setState({ rating });
  }

  render(){
    console.log(this.state)
    const airdate = moment(this.props.episodeInfo.airdate).format('MMMM Do YYYY')

    return (
      <ListGroupItem>
      <Label className="ml-3" check>
        <Input type="checkbox" />
      Episode {this.props.episodeInfo.number}: {this.props.episodeInfo.name}
        </Label><br />
      <small>Airdate: {airdate}</small><br />
      <div className="summary" dangerouslySetInnerHTML={ { __html: this.props.episodeInfo.summary }}></div>
      <Label htmlFor="rating">Episode rating</Label> {' '}
        <ButtonGroup size ="sm" id="rating">
          <Button color="info" onClick={() => this.onRadioBtnClick(1)} active={this.state.rating === 1}>1</Button>
          <Button color="info" onClick={() => this.onRadioBtnClick(2)} active={this.state.rating === 2}>2</Button>
          <Button color="info" onClick={() => this.onRadioBtnClick(3)} active={this.state.rating === 3}>3</Button>
          <Button color="info" onClick={() => this.onRadioBtnClick(4)} active={this.state.rating === 4}>4</Button>
          <Button color="info" onClick={() => this.onRadioBtnClick(5)} active={this.state.rating === 5}>5</Button>
        </ButtonGroup>
      <br />
      <Label htmlFor="comment">Comments</Label>
        <Input type="textarea" name="text" id="comment" onChange={e => this.setState({comments: e.target.value})} />
      </ListGroupItem>
    )
  }
}

export default Episode
