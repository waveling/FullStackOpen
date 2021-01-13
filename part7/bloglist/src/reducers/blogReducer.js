import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKE':
            return state.map((blog) =>
                blog.id !== action.data.id ? blog : { ...blog, likes: action.data.likes }
            )
        case 'INIT_BLOGS':
            return action.data
        case 'DELETE_BLOG':
            return state.filter((blog) =>
                blog.id !== action.data.id)
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
        const newUser = await blogService.getUser()
        dispatch({
            type: 'NEW_BLOG',
            data: { ...newBlog, user: newUser }
        })
    }
}

//add like
export const addLike = (id, newObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, newObject)
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
    }
}

//delete blogs
export const deleteBlog = (id) => {
    return async dispatch => {
        const deletedBlog = await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: deletedBlog
        })
    }
}

export default blogReducer