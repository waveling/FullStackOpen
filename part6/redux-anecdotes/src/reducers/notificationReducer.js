const notificationReducer = (state = null, action) => {
    switch (action.type) {

        case 'SET_NOTIFICATION':
            return action.message

        case 'HIDE_NOTIFICATION':
            return ''

        default:
            return state
    }
}


let timeoutID

export const setNotification = (message, duration = 5000) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message
        })

        if (typeof timeoutID === 'number') {
            clearTimeout(timeoutID)
        }

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
            })
        }, duration)
    }
}

export default notificationReducer
