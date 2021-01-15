import React, { useState, useEffect } from 'react'
import usersService from '../services/users'

const Users = () => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        const loadUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        }
        loadUsers()
    }, [])

    return (
        <div>
            <h2>Users</h2>
            {
                users.map((user) => {
                    return <h4 key={user.id}>{user.username}<p>{user.blogs.length}</p></h4>
                })
            }
        </div>
    )
}

export default Users