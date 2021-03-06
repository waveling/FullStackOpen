import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKE':
            return state.map((blog) =>
                blog.id !== action.data.id ? blog : { ...blog, likes: action.data.likes }
            )
        case 'ADD_COMMENT':
            return state.map((blog) =>
                blog.id !== action.data.id ? blog : { ...blog, comments: action.data.comments }
            )
        case 'INIT_BLOGS':
            return action.data
        case 'DELETE_BLOG':
            return state.filter((blog) =>
                blog.id !== action.data)
        default:
            return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

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

export const addLike = (id, newObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, newObject)
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
        dispatch(setNotification({
            text: `You liked the blog ${newObject.title}`,
            style: 'success'
        }))
    }
}

export const addComment = (id, newObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.addComment(id, newObject)
        dispatch({
            type: 'ADD_COMMENT',
            data: updatedBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export default blogReducer