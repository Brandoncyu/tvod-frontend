export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const SET_USER_ON_VERIFY = 'SET_USER_ON_VERIFY'

export const USER_LOGOUT = 'USER_LOGOUT'

export const userLogin = ({username, password}, history) =>{
  return async (dispatch) => {
    try {
      if (username.length === 0 || password.length === 0) throw new Error ('Login Failed')
      dispatch({type: USER_LOGIN_PENDING})
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      })
      if (response.status !== 200) throw new Error ('Login Failed')
      let userObject = await response.json()
      localStorage.setItem('token', userObject.token)
      localStorage.setItem('id', userObject.id)
      localStorage.setItem('username', username)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userObject
      })
    } catch(err){
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err
      })
    }
  }
}

export const registerUser = ({ firstname, lastname, email, image, username, password, aboutme, values }) =>{
  return async (dispatch) => {
    try {
      if (firstname.length === 0 || lastname.length === 0 || email.length === 0 || image.length === 0 || username.length === 0 || password.length === 0 ) throw new Error ('Login Failed')

      dispatch({type: USER_SIGNUP_PENDING})
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ firstname, lastname, email, image, username, password, aboutme, values })
      })

      if (response.status !== 201) throw new Error ('Login Failed')
      let userObject = await response.json()
      localStorage.setItem('token', userObject.token)
      localStorage.setItem('id', userObject.id)
      localStorage.setItem('username', username)
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: userObject
      })

    } catch(err){
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: err
      })
    }
  }
}

export const setUser = (data) => {
  return {
    type: SET_USER_ON_VERIFY,
    payload: data
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({type: USER_LOGOUT})
  }
}
