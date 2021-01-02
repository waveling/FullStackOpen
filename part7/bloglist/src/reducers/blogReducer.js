import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return action
        case 'ADD_LIKE':
            return action
        case 'INITIALIZE_BLOGS':
            return action
        default:
            return state
    }
}

//initialize blogs

//add blog

//update blogs (adding like etc...)

//delete blogs

//something to do with the token?



export default blogReducer