import axios from 'axios'
const TV_URL = 'http://api.tvmaze.com'

export const searchAll = async (title) => {
  const response = await axios.get(`${TV_URL}/search/shows?q=${title}`)
  return response.data
}

export const searchOne = async (title) => {
  const response = await axios.get(`${TV_URL}/singlesearch/shows?q=${title}`)
  return response.data
}

export const searchOneByNumber = async (id) => {
  const response = await axios.get(`${TV_URL}/shows/${id}/episodes`)
  return response.data.length
}

export const searchOneWithEpisodes = async (title) => {
  const response = await axios.get(`${TV_URL}/singlesearch/shows?q=${title}&embed=episodes`)
  return response.data
}
