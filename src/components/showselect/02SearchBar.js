import React, { Component } from 'react'
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap'
import { connect } from 'react-redux'

class SearchBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      search: '',
    }
  }

  searchShows = (event) =>{
    this.props.searchShows(this.state.search.replace(/ /g, '+'))
  }

  onChange = (event) =>{
    this.setState({search: event.target.value})
    this.searchShows()
  }

  render(){
    return (
      <InputGroup size="lg">
        <Input type="search" name="search" id="search" placeholder="Search for what you've been watching here!" onChange={this.onChange} />
        <InputGroupAddon onClick={this.searchShows} addonType="append"><Button color="secondary">Search</Button></InputGroupAddon>
      </InputGroup>
    )
  }
}


export default SearchBar
