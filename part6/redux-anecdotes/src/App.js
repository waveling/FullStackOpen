import React from 'react'
import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

    return (
        <div>
            <Notification />
            <h1>Anecdotes</h1>
            <Filter />
            <h3>Create New</h3>
            <AnecdoteForm />
            <br></br>
            <Anecdotes />
        </div>
    )
}

export default App
