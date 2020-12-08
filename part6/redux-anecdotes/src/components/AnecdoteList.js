import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { addVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

    const anecdotesToShow = () => {
        return props.anecdotes
    }

    const style = {
        margin: 10
    }

    useEffect(() => {
        props.initializeAnecdotes()
    }, [])

    const vote = (id, content) => {
        props.addVote(id)
        props.setNotification(`You voted "${content}"`, 5000)
    }

    return (
        <div>
            {anecdotesToShow()
                .filter((anecdote) => anecdote.content.includes(props.filter))
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id} style={style}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes} votes
                            <button style={style} onClick={() => vote(anecdote.id, anecdote.content)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

//mapStateToProps can be used to define the props of the connected component
//e.g. props.anecdotes references the anecdotes stored in the store
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote,
        notification: state.notification,
        filter: state.filter
    }
}

//Second param for connect function. Allows the use of action creators from the connected component's props
const mapDispatchToProps = {
    setNotification,
    addVote,
    initializeAnecdotes
}
//Connect-function accepts the 'mapStateToProps' -function as a parameter
//The Anecdotes component has direct access for inspecting the state in the store
const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes
