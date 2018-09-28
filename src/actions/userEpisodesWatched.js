import {getEpisodes, addEpisodeToDatabase, addCommentToDatabase, addRatingToDatabase} from '../models/userEpisodesWatched'
export const GET_EPISODES = 'GET_EPISODES'
export const ADD_EPISODE = 'ADD_EPISODE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_RATING = 'ADD_RATING'

export const getAllEpisodes = (userid, tvId) =>{
  return async (dispatch) => {
    let response = await getEpisodes(userid, tvId)
    const epInfo = {
      episodeInfo: response,
      episodeIds: response.filter(element => element.watched === true).map(element => element['ep_id'])
    }
    dispatch({
      type: GET_EPISODES,
      payload: epInfo
    })
  }
}

export const addEpisode = (userId, tvId, epId, seasonNo, epNo, epName) =>{
  return async (dispatch) => {
    let response = await addEpisodeToDatabase(userId, tvId, epId, seasonNo, epNo, epName)

    const epInfo = {
      episodeInfo: response,
      episodeIds: response.filter(element => element.watched === true).map(element => element['ep_id'])
    }
    dispatch({
      type: ADD_EPISODE,
      payload: epInfo
    })
  }
}

export const addComment = (userId, tvId, epId, comment) =>{
  return async (dispatch) =>{
    let response = await addCommentToDatabase(userId, tvId, epId, comment)

    const epInfo = {
      episodeInfo: response,
      episodeIds: response.filter(element => element.watched === true).map(element => element['ep_id'])
    }

    dispatch({
      type: ADD_COMMENT,
      payload: epInfo
    })
  }
}

export const addRating = (userId, tvId, epId, rating) =>{
  return async (dispatch) =>{
    let response = await addRatingToDatabase(userId, tvId, epId, rating)

    const epInfo = {
      episodeInfo: response,
      episodeIds: response.filter(element => element.watched === true).map(element => element['ep_id'])
    }

    dispatch({
      type: ADD_RATING,
      payload: epInfo
    })
  }
}
