const detailReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_DETAILS':
            return state ? false : true
        case 'HIDE_DETAILS':
            return state
        default:
            return state
    }
}

export const showDetails = () => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_DETAILS'
        })
    }
}

export default detailReducer