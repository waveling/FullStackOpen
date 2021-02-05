import React, { useState } from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {

    const dispatch = useDispatch()

    const [ inputValue, setInputValue ] = useState('')

    const handleAddComment = (id, newObject) => {
        dispatch(addComment(id, newObject))
    }

    return (
        <div>
            <h2>Comments</h2>
            <input placeholder='Add comment' onChange={({ target }) => setInputValue(target.value)}></input>
            <button onClick={() => handleAddComment(blog.id, { ...blog, comments: blog.comments.concat(inputValue) }) }>Add Comment</button>
            <ul>
                {
                    blog.comments.map((comment) => {
                        return <li key={comment.length * Math.random() * 10000}>{comment}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Comments