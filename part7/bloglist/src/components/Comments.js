import React from 'react'

const Comments = ({ comments }) => {
    return (
        <div>
            <h2>Comments</h2>
            <ul>
                <li>{comments}</li>
            </ul>
        </div>
    )
}

export default Comments