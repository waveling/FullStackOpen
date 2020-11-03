import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
    showNotification,
    hideNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <li> {anecdote.content} </li>
            <div> has {anecdote.votes} votes </div>
            <button onClick={handleClick}>Vote</button>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdote)
    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => {
                            vote(anecdote.id, anecdote.content)
                        }}
                    />
                ))}
        </div>
    )
}

export default Anecdotes
