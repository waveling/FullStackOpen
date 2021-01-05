import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state:', state)
    console.log('action:', action)
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKE':
            return state.map((blog) =>
                blog.id !== action.data.id ? blog : action.data
            )
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
    return async dispatch => {
        const newBlog = await blogService.create(blogData)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

//add like
export const addLike = (id) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id)
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
    }
}

//delete blogs

//something to do with the token?



export default blogReducer