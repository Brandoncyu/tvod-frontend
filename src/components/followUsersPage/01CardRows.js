import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { shuffle } from '../_shuffle'
import { getUserData } from '../../actions/followUsersPage'
import ShowCards from './02ShowCards'
import {
  Container, Row, Col, CardColumns
} from 'reactstrap';



const cardRows = (props) =>  {
  const series = props.userPage.series
  let favorite = []
  let nonFavorite = []
  if (series){
    favorite = series.filter(element => element['favorite'] === true)
    nonFavorite = series.filter(element => element['favorite'] !== true)
  }
  console.log(favorite,nonFavorite)
  return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1 className="text-center">{props.userPage.username}'s favorites</h1>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start card-wrapper">
            { favorite.length > 0 && favorite.map((element, index) =>{
              return <ShowCards showInfo={element} key={index} />
            } )}
          </div>
        </Row>
        <br />
        <Row>
          <Col>
            <h1 className="text-center">{props.userPage.username}'s other shows</h1>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start card-wrapper">
            { nonFavorite.length > 0 && nonFavorite.map((element, index) =>{
              return <ShowCards showInfo={element} key={index} />
            } )}
          </div>
        </Row>
      </Container>
  )
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

function mapDispatchToProps(dispatch){
  return{
    getUserData: bindActionCreators(getUserData, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(cardRows))
