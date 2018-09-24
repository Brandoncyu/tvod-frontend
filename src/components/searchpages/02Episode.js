import React, { Component } from 'react'
import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  ListGroupItem
} from 'reactstrap'

class Episode extends Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
      <ListGroupItem>
      <Label className="ml-3" check>
        <Input type="checkbox" />
      Episode {this.props.episodeInfo.number}: {this.props.episodeInfo.name}<br />
      <p className="summary" dangerouslySetInnerHTML={ { __html: this.props.episodeInfo.summary }}></p>
      </Label>
      </ListGroupItem>
    )
  }
}

export default Episode
