import { searchOneWithEpisodes} from '../models/showSelect'
export const GET_RESULTS_AND_EPISODES = 'GET_RESULTS_AND_EPISODES'
export const CLEAR_RESULTS_AND_EPISODES = 'CLEAR_RESULTS_AND_EPISODES'

export const searchShowsWithEpisodes = (title, userid) =>{
  return async (dispatch) => {
    let response = await searchOneWithEpisodes(title)
    const today = new Date(Date.now())

    let showObjectWithEpisodes = {
      showInfo: response,
      episodes: response._embedded.episodes,
      airedEpisodes: response._embedded.episodes.filter(episode => today > new Date(episode.airdate))
    }
    dispatch({
      type: GET_RESULTS_AND_EPISODES,
      payload: showObjectWithEpisodes
    })

  }
}

export const clearShowsWithEpisodes = () =>{
  return (dispatch) => {
    let response = {}
    dispatch({
      type: CLEAR_RESULTS_AND_EPISODES,
      payload: response
    })
  }

}
export const getTvId = async (title) =>{
  const response = await searchOneWithEpisodes(title)
  return response.id
}
