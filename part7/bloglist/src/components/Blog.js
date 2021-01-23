import React, { } from 'react'
import { Link, useParams } from 'react-router-dom'
//import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
//import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

export const Item = ({ blog, authorizeRemove, removeBlog }) => {
    //Local state for showing/hiding the details for each Item-component
    //const [details, setDetails ] = useState(false)
    const dispatch = useDispatch()

    const updateLikes = (id, newObject) => {
        //dispatch(addLike(id, newObject))
        dispatch(setNotification({
            text: `Great success ${newObject}`,
            style: 'success'
        }))
    }

    const id = useParams().id

    return (
        <ul className='blogItem'>
            {blog.title} by {blog.author}
            {id && (
                <div className="detailedInfo">
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
                </div>
            )}
        </ul>
    )
}

const Blog = () => {
    //const dispatch = useDispatch()

    //get blogs from store
    const blogs = useSelector(state => state.blogs)

    /* const removeBlog = (blog) => {
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
    } */

    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <ul key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                    </ul>
                ))
            }
        </div>
    )
}

export default Blog
