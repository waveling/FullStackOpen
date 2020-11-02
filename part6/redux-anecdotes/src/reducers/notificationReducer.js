const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SUCCESS':
            return 'Success'
        case 'FAILURE':
            return 'Failure'
        default:
            return ''
    }
}

export default notificationReducer
