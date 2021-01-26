import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Comments from './Comments'

const SingleBlog = () => {

    const blogs = useSelector(state => state.blogs)
    const id = useParams().id

    const dispatch = useDispatch()

    const updateLikes = (id, newObject) => {
        dispatch(addLike(id, newObject))
    }

    const removeBlog = (blog) => {
        if (
            window.confirm(
                `Are you sure you want to delete the blog ${blog.title}?`
            )
        ) {
            dispatch(deleteBlog(blog.id))
        }
    }

    const authorizeRemove = (identifiedUser) => {
        const user = blogService.getUser()
        if (user.id === identifiedUser) {
            return true
        }
    }

    return (
        <div>
            {
                blogs.map((blog) => {
                    if (blog.id === id) {
                        return (
                            <div key={blog.id} className="detailedInfo">
                                <h2>{blog.title} by {blog.author}</h2>
                                <p className="likes">Likes: {blog.likes}</p>
                                <p className="url">Url: {blog.url}</p>
                                <p>User: {blog.user.username}</p>
                                <button onClick={() => updateLikes(blog.id,{ ...blog, likes: blog.likes + 1 })} className="like">
                                    like
                                </button>
                                {authorizeRemove(blog.user.id) && (
                                    <button className="remove" onClick={() => removeBlog(blog)}>
                                        remove
                                    </button>
                                )}
                                <Comments
                                    id={blog.id}
                                    comments={blog.comments}
                                />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default SingleBlog