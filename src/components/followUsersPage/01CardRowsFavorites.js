import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ShowCards from './02ShowCards'


const CardRowsFavorites = (props) =>  {
  const series = props.userPage.series
  let nonFavorite = []
  if (series){
    nonFavorite = series.filter(element => element['favorite'] !== true)
  }

  return (
    <div className="d-flex justify-content-start card-wrapper">
      { nonFavorite.length > 0 && nonFavorite.map((element, index) =>{
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

export default withRouter(connect(mapStateToProps)(CardRowsFavorites))
