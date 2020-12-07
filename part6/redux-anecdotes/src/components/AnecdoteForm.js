import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const submitAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added new anecdote: ${content}`))
    }

    return (
        <form onSubmit={submitAnecdote}>
            <input name='anecdote' />
            <button type='submit'>Add</button>
        </form>
    )
}

export default AnecdoteForm