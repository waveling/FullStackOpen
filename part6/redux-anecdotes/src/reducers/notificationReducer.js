const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return `You voted for "${action.data.content}"`
        case 'HIDE_NOTIFICATION':
            return action.data
        default:
            return ''
    }
}

export const showNotification = (content) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            content,
        },
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: '',
    }
}

export default notificationReducer
