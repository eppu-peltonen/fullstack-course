const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined) {
    return res.status(400).json({error: 'password missing'})
  }
  if (body.password.length < 4) {
    return res.status(400).json({error: 'password too short'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (exception) {
    return res.status(400).json({error: exception})
  } 
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter