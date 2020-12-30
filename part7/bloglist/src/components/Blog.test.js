import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockHandler = jest.fn()
    const user = {
        id: 'abcdefghijklmn',
        name: 'Itsa Test',
        username: 'testerbot',
    }

    const blog = {
        likes: 10,
        author: 'Jari Tervo',
        url: 'https://randomurl.com',
        title: 'Not A Real Title',
        user: {
            id: 'abcdefghijklmn',
            name: 'Itsa Test',
            username: 'testerbot',
        },
        id: 'iuhsdiufs8fsdhfs8fsjdhf9',
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog} user={user} handleLikes={mockHandler} />
        )
    })

    test('render title and author', () => {
        expect(component.container.querySelector('.title')).toHaveTextContent(
            blog.title
        )
        expect(component.container.querySelector('.author')).toHaveTextContent(
            blog.author
        )
        expect(component.queryByText(blog.url)).not.toBeInTheDocument()
        expect(component.queryByText('like')).not.toBeInTheDocument()
    })

    test('additional information can be toggled', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        expect(component.container.querySelector('.url')).toHaveTextContent(
            blog.url
        )
        expect(component.container.querySelector('.likes')).toHaveTextContent(
            blog.likes
        )
    })

    test('likes can be added by clicking', () => {
        const showButton = component.getByText('show')
        fireEvent.click(showButton)
        const likeButton = component.getByText('like')
        //Like-button is clicked twice
        for (let i = 0; i < 2; i++) {
            fireEvent.click(likeButton)
        }

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
