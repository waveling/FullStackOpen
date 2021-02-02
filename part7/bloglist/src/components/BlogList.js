import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const StyledList = styled.li`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    padding: 1rem 1rem 1rem 3rem;
    position: relative;
    border-radius: 0.5rem;
    margin-top: 1rem;
    min-height: 3rem;
    background-color: lightgrey;
    box-shadow: 0.25rem 0.25rem 0.6rem rgba(0,0,0,0.05), 0 0.5rem 1.125rem rgba(75,0,0,0.05)
`

const StyledLink = styled(Link)`
    color: #232323;
`

const BlogList = () => {
    //get blogs from store
    const blogs = useSelector(state => state.blogs)

    return (
        <ListWrapper>
            <h1>Blogs</h1>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <StyledList key={blog.id}>
                        <StyledLink to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</StyledLink>
                    </StyledList>
                ))
            }
        </ListWrapper>
    )
}

export default BlogList
