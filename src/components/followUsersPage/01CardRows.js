import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ShowCards from './02ShowCards'
import {
  Container, Row, Col
} from 'reactstrap';



const CardRows = (props) =>  {
  const series = props.userPage.series
  let favorite = []
  let nonFavorite = []
  if (series){
    favorite = series.filter(element => element['favorite'] === true)
    nonFavorite = series.filter(element => element['favorite'] !== true)
  }
  return (
      <Container className="my-4">
        <Row>
          <Col>
            {props.userPage.username && <h1 className="text-center">{props.userPage.username}'s favorites</h1>}
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
            {props.userPage.username && <h1 className="text-center">{props.userPage.username}'s other shows</h1>}
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

export default withRouter(connect(mapStateToProps)(CardRows))
