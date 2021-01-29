import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const UsersListItem = styled.li`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    padding: 1rem 1rem 1rem 3rem;
    position: relative;
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    margin-top: 1rem;
    min-height: 3rem;
    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)
`

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
        <UsersWrapper>
            <h2>Users</h2>
            <div>
                <div>
                    {
                        users.map((user) => {
                            return (
                                <UsersListItem key={user.id}>
                                    <Link to={`/users/${user.id}`}>{user.username}<span className='userBlogCount'>{user.blogs.length}</span></Link>
                                </UsersListItem>
                            )
                        })
                    }
                </div>
            </div>
        </UsersWrapper>
    )
}

export default Users