import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding-top: 100px;
`

const StyledListItem = styled.li`
    display: flex;
`

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
        <UserWrapper>
            {
                users.filter((user) => {
                    return user.id === id
                }).map((filteredUser) => {
                    return filteredUser.blogs.map((blog) => {
                        return <StyledListItem key={blog.id}>{blog.title}</StyledListItem>
                    })
                })
            }
        </UserWrapper>
    )
}

export default User