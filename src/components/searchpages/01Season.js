import React, { Component } from 'react'
import Episode from './02Episode'
import {
  FormGroup,
  Label,
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
      <FormGroup>
        <Label check>
          <Input type="checkbox" />
            Watched All
        </Label>
        <ListGroup>
        { this.props.season.map((episodeInfo, index) => {return <Episode key={index} showId={this.props.showId} episodeInfo={episodeInfo} />}) }
        </ListGroup>
      </FormGroup>
    )
  }
}

export default Season
