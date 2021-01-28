import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from './Styled'
import styled from 'styled-components'

const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.input`
    padding: 12px 20px;
    width: 100%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`

const BlogForm = () => {
    const dispatch = useDispatch()

    const handleAddBlog = (event) => {
        event.preventDefault()
        dispatch(addBlog({
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }))
        dispatch(setNotification({
            text: 'New blog was added!',
            style: 'success',
        }))
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    return (
        <div>
            <FormWrapper>
                <h2>Add new blog</h2>
                <StyledForm className="form" onSubmit={handleAddBlog} >
                    <label>Title</label>
                    <StyledInput
                        name='title'
                        className="titleInput"
                    />
                    <label>Author</label>
                    <StyledInput
                        name='author'
                        className="authorInput"
                    />
                    <label>Url</label>
                    <StyledInput
                        name='url'
                        className="urlInput"
                    />
                    <Button className="submit-blog-button" type="submit">
                        Add Blog
                    </Button>
                </StyledForm>
            </FormWrapper>
        </div>
    )
}

export default BlogForm
