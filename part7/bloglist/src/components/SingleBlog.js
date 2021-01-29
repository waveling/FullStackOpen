import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Comments from './Comments'
import styled from 'styled-components'

const BlogWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Button = styled.button`
    padding: 12px 20px;
    width: 100%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: lightskyblue;
`

const RemoveButton = styled(Button)`
    background-color: lightpink;
`

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
        <BlogWrapper>
            {
                blogs.map((blog) => {
                    if (blog.id === id) {
                        return (
                            <div key={blog.id} className="detailedInfo">
                                <h2>{blog.title} by {blog.author}</h2>
                                <p className="likes">Likes: {blog.likes}</p>
                                <p className="url">Url: {blog.url}</p>
                                <p>User: {blog.user.username}</p>
                                <Button onClick={() => updateLikes(blog.id,{ ...blog, likes: blog.likes + 1 })} >
                                    like
                                </Button>
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
        </BlogWrapper>
    )
}

export default SingleBlog