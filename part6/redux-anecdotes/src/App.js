import React from 'react'
import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <AnecdoteForm />
            <Anecdotes />
        </div>
    )
}

export default App
