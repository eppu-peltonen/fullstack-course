const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (blog.title === undefined) {
      return res.status(400).json({error: 'title missing'})
    } else if (blog.url === undefined) {
      return res.status(400).json({error: 'url missing'})
    }
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
  } catch (exception) {
    res.status(400).json({error: exception})
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const blogToDelete = await Blog.findById(req.params.id)
    if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({error: 'unauthorized'})
    }

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(exception) {
    res.status(400).json({error: exception})
  }
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