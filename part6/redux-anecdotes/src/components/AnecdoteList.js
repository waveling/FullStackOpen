import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = () => {
    return <div>Anecdote</div>
}


const Anecdotes = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {console.log('anekdootit', anecdotes)}
        </div>
    )
}

export default Anecdotes
