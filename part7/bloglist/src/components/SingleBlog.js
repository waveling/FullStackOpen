import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Comments from './Comments'
import { LikeButton, RemoveButton } from './Styled'

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
                                <LikeButton onClick={() => updateLikes(blog.id,{ ...blog, likes: blog.likes + 1 })} >
                                    like
                                </LikeButton>
                                {authorizeRemove(blog.user.id) && (
                                    <RemoveButton onClick={() => removeBlog(blog)}>
                                        remove
                                    </RemoveButton>
                                )}
                                <Comments
                                    blog={blog}
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