import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state:', state)
    console.log('action:', action)
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKE':
            return action
        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }
}

//initialize blogs
export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

//add blog
export const addBlog = (blogData) => {
    console.log('blogdata:', blogData)
    return async dispatch => {
        const newBlog = await blogService.create(blogData)
        console.log('newBlog:', newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

//update blogs (adding like etc...)

//delete blogs

//something to do with the token?



export default blogReducer