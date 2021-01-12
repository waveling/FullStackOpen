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
        case 'CHECK_LOCALSTORAGE':
            return action.data
        default:
            return state
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
        //set user information to localStorage-object
        window.localStorage.setItem(
            'loggedBlogAppUser',
            JSON.stringify(user)
        )
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
        dispatch({
            type: 'SET_TOKEN',
            data: token
        })
    }
}

//check if user is already in localstorage, so no need to log in again
export const checkLocalStorage = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'CHECK_LOCALSTORAGE',
                data: user
            })
            blogService.setToken(user.token)
        }
    }
}

export default userReducer