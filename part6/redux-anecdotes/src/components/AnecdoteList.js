import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={(() => {
                            dispatch(addVote(anecdote.id))
                        })}
                    />
                )}
        </div>
    )
}

export default Anecdotes
