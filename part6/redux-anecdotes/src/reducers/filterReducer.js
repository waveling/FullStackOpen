const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.content
        default:
            return state
    }
}

export const handleFilter = (targetValue) => {
    return {
        type: 'FILTER',
        content: targetValue,
    }
}

export default filterReducer
