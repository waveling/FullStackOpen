import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)
    const anecdotes = useSelector((state) => state.anecdote)

    const style = {
        margin: 10
    }

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(setNotification(`You voted "${content}"`, 5000))
    }

    return (
        <div>
            {anecdotes
                .filter((anecdote) => anecdote.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id} style={style}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes} votes
                            <button style={style} onClick={() => vote(anecdote.id, anecdote.content)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Anecdotes
