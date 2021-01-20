import React, { useEffect, useState } from 'react'
import usersService from '../services/users'

const User = () => {

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
            {
                users.map((user) => {
                    if (user.blogs[0]) {
                        return (
                            <div key={user.id}>{user.blogs[0].author}</div>
                        )
                    }
                })
            }
        </div>
    )
}

export default User