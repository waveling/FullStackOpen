const notificationReducer = (state = '', action) => {
    switch (action.type) {

        case 'SET_NOTIFICATION':
            return action.message

        case 'HIDE_NOTIFICATION':
            return ''

        default:
            return ''
    }
}

export const setNotification = (message, duration = 5000) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
            })
        }, duration)
    }
}

export default notificationReducer
