import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ComponentWrapper = styled.div`
    display: flex;
    justify-self: center;
    width: 100%;
    max-width: 650px;
    padding-top: 10rem;
`

const BlogCountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    min-width: 120px;
`

const UsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const StyledTitle = styled.h2`
    display: inline-block;
    padding: 20px;
`

const UsersListItem = styled.li`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    position: relative;
    border-radius: 0.5rem;
    margin-top: 1rem;
    min-height: 3rem;
    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05);
    background-color: lightgrey;
`

const BlogCountItem = styled.li`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    position: relative;
    border-radius: 0.5rem;
    margin-top: 1rem;
    min-height: 3rem;
    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05);
    background-color: lightgrey;
    color: #323232;
`

const StyledLink = styled(Link)`
    color: #232323;
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
        <ComponentWrapper>
            <UsersWrapper>
                <StyledTitle>Users</StyledTitle>
                {
                    users.map((user) => {
                        return (
                            <UsersListItem key={user.id}>
                                <StyledLink to={`/users/${user.id}`}>{user.username}</StyledLink>
                            </UsersListItem>
                        )
                    })
                }
            </UsersWrapper>
            <BlogCountWrapper>
                <StyledTitle>Blog Count</StyledTitle>
                {
                    users.map((user) => {
                        return (
                            <BlogCountItem key={user.id}>
                                {user.blogs.length}
                            </BlogCountItem>
                        )
                    })
                }
            </BlogCountWrapper>
        </ComponentWrapper>
    )
}

export default Users