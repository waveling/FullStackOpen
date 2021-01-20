import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {

    const [ users, setUsers ] = useState([])

    const id = useParams().id

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
                users.filter((user) => {
                    return user.id === id
                }).map((filteredUser) => {
                    return filteredUser.blogs.map((blog) => {
                        return <li key={blog.id}>{blog.title}</li>
                    })
                })
            }
        </div>
    )
}

export default User