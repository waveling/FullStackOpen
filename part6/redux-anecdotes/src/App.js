import React from 'react'
import AnecdoteList from './components/AnecdoteList'
/* import AnecdoteForm from './components/AnecdoteForms' */
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const vote = (id) => {
        console.log('vote', id)
    }

    return (
        <AnecdoteList />
    )
}

export default App
