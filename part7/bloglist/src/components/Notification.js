import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    //Get the state in redux store
    const message = useSelector(message => message)

    if (message === null) {
        return null
    }

    return <div className={message.type}>{message.text}</div>
}

export default Notification
