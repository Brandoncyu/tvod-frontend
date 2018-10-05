import axios from 'axios'

const TV_URL_SERVER = 'https://api.tvmaze.com'

export const searchAll = async (title) => {
  const response = await axios.get(`${TV_URL_SERVER }/search/shows?q=${title}`)
  return response.data
}

export const searchOne = async (title) => {
  const response = await axios.get(`${TV_URL_SERVER}/singlesearch/shows?q=${title}`)
  return response.data
}

export const searchOneByNumber = async (id) => {
  const response = await axios.get(`${TV_URL_SERVER}/shows/${id}/episodes`)
  return response.data
}

export const searchOneWithEpisodes = async (title) => {
  const response = await axios.get(`${TV_URL_SERVER}/singlesearch/shows?q=${title}&embed=episodes`)
  return response.data
}
