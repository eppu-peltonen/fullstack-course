const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('total likes', () => {
  test('when empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', async () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(12)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect (result).toBe(24)
  })
})

describe('favorite blog',() => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('of bloglist is the one with most likes', () => {

    const favoriteBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual(favoriteBlog)
  })
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are identified by "id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(x => x.title)
  expect(titles).toContain('title1')
})

afterAll(() => {
  mongoose.connection.close()
})