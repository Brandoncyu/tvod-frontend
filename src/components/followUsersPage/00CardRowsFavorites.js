import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ShowCards from './02ShowCards'



const CardRows = (props) =>  {
  const series = props.userPage.series
  let favorite = []
  if (series){
    favorite = series.filter(element => element['favorite'] === true)
  }

  return (
    <div className="backGrey d-flex justify-content-start card-wrapper">
      { favorite.length > 0 && favorite.map((element, index) =>{
        return <ShowCards
          key={index}
          showInfo={element}
        />
      } )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

export default withRouter(connect(mapStateToProps)(CardRows))
