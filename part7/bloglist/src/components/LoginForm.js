import React, { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import {  useDispatch } from 'react-redux'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    //Event handler for logging in
    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(setUser({
            username,
            password
        }))
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login with username and password</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
