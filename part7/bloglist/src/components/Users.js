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
            <div className='userViewContainer'>
                <div className='blogCountStyle'>
                    Blog count
                </div>
                <div>
                    {
                        users.map((user) => {
                            return (
                                <h4 key={user.id}>{user.username}<span className='userBlogCount'>{user.blogs.length}</span></h4>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Users