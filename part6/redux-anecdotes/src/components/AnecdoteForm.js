import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const submitAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`Added new anecdote: ${content}`)
    }

    return (
        <form onSubmit={submitAnecdote}>
            <input name='anecdote' />
            <button type='submit'>Add</button>
        </form>
    )
}

//Second param for connect function. Allows the use of action creators from the connected component's props
const mapDispatchToProps = {
    setNotification,
    createAnecdote,
}
//Connect-function accepts the 'mapStateToProps' -function as a parameter
//The Anecdotes component has direct access for inspecting the state in the store
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm