import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

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
                                <div key={user.id}>
                                    <Link to={`/users/${user.id}`}>{user.username}<span className='userBlogCount'>{user.blogs.length}</span></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Users