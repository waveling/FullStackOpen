
const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

//action creator for setting the notification
export const setNotification = (message) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            text: message.text,
            style: message.style
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, 3500)
    }
}


export default notificationReducer