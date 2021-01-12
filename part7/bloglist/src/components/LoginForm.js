import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    setPassword,
    password,
}) => {
    LoginForm.propTypes = {
        handleLogin: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
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
