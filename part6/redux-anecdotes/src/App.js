import React from 'react'
import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    return (
        <div>
            <AnecdoteForm />
            <Anecdotes />
        </div>
    )
}

export default App
