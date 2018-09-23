import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { searchAll, searchOne, searchOneWithEpisodes } from '../../models/showSelect'

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

  render(){
    return (
      <InputGroup size="lg">
        <Input type="search" name="search" id="search" placeholder="Search for what you've been watching here!" onChange={e=>this.setState({search: e.target.value})} />
        <InputGroupAddon onClick={this.searchShows} addonType="append"><Button color="secondary">Search</Button></InputGroupAddon>
      </InputGroup>
    )
  }
}


export default SearchBar
