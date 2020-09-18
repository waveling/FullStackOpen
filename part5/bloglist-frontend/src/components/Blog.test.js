import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = {
    id: 'abcdefghijklmn',
    name: 'Itsa Test',
    username: 'testerbot'
  }

  const blog = {
    likes: 10,
    author: 'Jari Tervo',
    url: 'https://randomurl.com',
    title: 'Not A Real Title',
    user: {
      id: 'abcdefghijklmn',
      name: 'Itsa Test',
      username: 'testerbot'
    },
    id: 'iuhsdiufs8fsdhfs8fsjdhf9'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
      />
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
    
  })

})