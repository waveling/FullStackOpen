
//As I understand, the action creator is exported and used in the actual react-components.
//So I'll have to refactor the react components to dispatch this action when a notification needs to
//be shown.


const notificationReducer = (state = '', action) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
        case 'success':
            return action
        case 'error':
            return action
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return ''
    }
}

//action creator for setting the notification
export const setReduxNotification = (message) => {
    console.log('reduxNotMessage', message)
    return {
        type: message.type,
        message: message.text
    }
}


export default notificationReducer