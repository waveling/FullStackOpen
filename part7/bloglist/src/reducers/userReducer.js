import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data
        case 'LOGOUT':
            return null
        case 'SET_PASSWORD':
            return [...state, action.data]
        case 'SET_USERNAME':
            return [...state, action.data]
        case 'SET_TOKEN':
            return [...state, action.data]
        default:
            return null
    }
}

//Action creator to store the user information to the state
export const setReduxUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch({
            type: 'SET_USER',
            data: user
        })
        blogService.setToken(user.token)
    }
}

export const setLogout = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const setReduxUsername = (username) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USERNAME',
            data: username
        })
    }
}

export const setReduxPassword = (password) => {
    return async dispatch => {
        dispatch({
            type: 'SET_PASSWORD',
            data: password
        })
    }
}

export const setReduxToken = (newToken) => {
    return async dispatch => {
        const token = blogService.setToken(newToken)
        console.log('newToken:', newToken)
        console.log('token:', token)
        dispatch({
            type: 'SET_TOKEN',
            data: token
        })
    }
}
export default userReducer