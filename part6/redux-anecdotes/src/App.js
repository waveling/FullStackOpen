import React, { useEffect } from 'react'
import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

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
