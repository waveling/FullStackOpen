const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'someaction':
            return 'something'
        default:
            return 'testing'
    }
}
