import React from 'react'
import Anecdotes from './components/AnecdoteList'
/* import AnecdoteForm from './components/AnecdoteForms' */
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const vote = (id) => {
        console.log('vote', id)
    }

    return (
        <Anecdotes />
    )
}

export default App
