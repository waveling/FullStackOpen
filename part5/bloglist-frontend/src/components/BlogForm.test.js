import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm />', () => {
    let createBlog = jest.fn()
    const component = render(
        <BlogForm createBlog={createBlog} setNotification={createBlog} />
    )

    const authorInput = component.container.querySelector('.authorInput')
    const titleInput = component.container.querySelector('.titleInput')
    const urlInput = component.container.querySelector('.urlInput')
    const form = component.container.querySelector('.form')

    fireEvent.change(authorInput, {
        target: {
            value: 'Testi Kirjoittaja',
        },
    })

    fireEvent.change(titleInput, {
        target: {
            value: 'Testi Titteli',
        },
    })

    fireEvent.change(urlInput, {
        target: {
            value: 'http://testi.com',
        },
    })

    fireEvent.submit(form)

    console.log(createBlog.mock.calls[0][0].title)

    expect(createBlog.mock.calls).toHaveLength(2)
    expect(createBlog.mock.calls[0][0].title).toBe('Testi Titteli')
})
