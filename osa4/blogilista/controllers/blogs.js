const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body. url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter