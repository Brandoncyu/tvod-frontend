import React, { Component } from 'react'
import Episode from './02Episode'
import {
  FormGroup,
  Label,
  InputGroup,
  Input
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
            Season {this.props.seasonNumber}
        </Label>
        { this.props.season.map(episodeInfo => {return <Episode episodeInfo={episodeInfo} />}) }
      </FormGroup>
    )
  }
}

export default Season
