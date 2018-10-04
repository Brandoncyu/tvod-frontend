import React from 'react'
import {shuffle} from '../_shuffle'
import ShowCards from './01MyShows/ShowCards'
import { connect } from 'react-redux'


const MyShowsNonFavorites = (props) => {
  const shuffledSeries = shuffle(props.allSeries)
  const favorite = shuffledSeries.filter(series => series.favorite === true)
  const nonFavorite = shuffledSeries.filter(series => series.favorite !== true)

  return (
    <div className="d-flex justify-content-start card-wrapper">
      {nonFavorite.map((element, index) =>{
        return <ShowCards
          key={index}
          showInfo={element} />
      })}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    allSeries: state.allSeries.allSeries
  }
}

export default connect(mapStateToProps)(MyShowsNonFavorites)
