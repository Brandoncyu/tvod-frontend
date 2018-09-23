import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
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


  render(){
    return (
      <Container>
        <Row>
          <Col md="9">
            <Form>
              <FormGroup>
                <Input type="search" name="search" id="search" placeholder="Type in what you've been watching here!" value={this.state.search}/>
              </FormGroup>
            </Form>
          </Col>
          <Col>
            <h4>Your Shows</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default SearchBar
