import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { showDetails } from '../reducers/detailReducer'

const Blog = () => {
    //dispatch action from redux store
    const dispatch = useDispatch()

    //get blogs from store
    const blogs = useSelector(state => state.blogs)
    const details = useSelector(state => state.details)
    console.log('detail',details)

    const handleDetails = () => {
        dispatch(showDetails())
    }

    const updateLikes = (id) => {
        dispatch(addLike(id))
    }

    /* const removeBlog = () => {
        if (
            window.confirm(
                `Are you sure you want to delete the blog ${blog.title}?`
            )
        ) {
            handleDelete(blog)
        }
    } */

    const authorizeRemove = (identifiedUser) => {
        const user = blogService.getUser()
        if (user.id === identifiedUser) {
            return true
        }
    }

    return (
        <div>
            {blogs
                .sort((a, b) => a.likes - b.likes)
                .map((blog) => (
                    <ul key={blog.id} className='blogItem'>
                        <p className="title">
                            {blog.title}
                            <button className="detailButton" onClick={handleDetails}>
                                {details ? 'hide' : 'show'}
                            </button>
                        </p>
                        <p className="author">{blog.author}</p>
                        {details && (
                            <div className="detailedInfo">
                                <p className="likes">Likes: {blog.likes}</p>
                                <p className="url">Url: {blog.url}</p>
                                <p>User: {blog.user.username}</p>
                                <button onClick={() => updateLikes(blog.id)} className="like">
                            like
                                </button>
                                {authorizeRemove(blog.user.id) && (
                                    <button className="remove">
                                remove
                                    </button>
                                )}
                            </div>
                        )}
                    </ul>
                ))
            }
        </div>
    )
}

export default Blog
