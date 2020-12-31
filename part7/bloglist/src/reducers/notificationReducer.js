
//As I understand, the action creator is exported and used in the actual react-components.
//So I'll have to refactor the react components to dispatch this action when a notification needs to
//be shown.


const notificationReducer = (state = '', action) => {
    console.log('state:', state)
    switch (action.type) {
        case 'NOTIFICATION':
            return action
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return ''
    }
}

//action creator for setting the notification
export const setNotification = (message) => {
    console.log('reduxNotiMessage', message)
    if (message === null) {
        return ''
    }
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