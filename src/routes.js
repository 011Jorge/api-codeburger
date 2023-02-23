import { Router } from 'express'
import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router()

routes.get('/', async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: 'Jorge',
    email: 'rodolfos@email.com',
    password_hash: '12345',
    admin: true,
  })

  return res.json(user)
})

export default routes
