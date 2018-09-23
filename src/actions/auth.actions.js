export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const userLogin = ({username, password}, history) =>{
  return async (dispatch) => {
    try {
      dispatch({type: USER_LOGIN_PENDING})
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      })
      let userObject = await response.json()
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userObject
      })
      localStorage.setItem('token', userObject.token)
      localStorage.setItem('id', userObject.id)
      history.push('/')
    } catch(err){
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err
      })
    }
  }
}

export const registerUser = ({ firstname, lastname, email, username, password, aboutme, values }) =>{
  return async (dispatch) => {
    try {
      dispatch({type: USER_SIGNUP_PENDING})
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ firstname, lastname, email, username, password, aboutme, values })
      })
      let userObject = await response.json()
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: userObject
      })
      localStorage.setItem('token', userObject.token)
      localStorage.setItem('id', userObject.id)
    } catch(err){
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: err
      })
    }
  }
}
