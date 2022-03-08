import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog', () => {

  const blog = {
    title: 'nimi'
  }

  beforeEach(() => {
    render(
      <Blog blog={blog} />
    )
  })

  test('renders title', () => {
    screen.getByText('nimi')
  })
})



