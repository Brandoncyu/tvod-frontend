import React, { Component } from 'react'
import Episode from './02Episode'
import {
  FormGroup,
  Button,
  InputGroup,
  Input,
  ListGroup
} from 'reactstrap'

class Season extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div>
        <Button color="info" size="sm">+ Watched All</Button><br />
        <ListGroup>
        { this.props.season.map((episodeInfo, index) => {return <Episode key={index} showId={this.props.showId} episodeInfo={episodeInfo} />}) }
        </ListGroup>
      </div>
    )
  }
}

export default Season
