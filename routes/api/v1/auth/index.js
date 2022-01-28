import { Router } from 'express'

import { authLogin, authLogout } from './auth-controller'

const Auth = Router()

Auth.use((req, res, next) => {
  next()
})

/**
 * @api {post} /api/v1/auth/login Login
 * @apiName Login
*/
Auth.post('/login', authLogin)

/**
 * @api {post} /api/v1/auth/login Login
 * @apiName Login
*/
Auth.post('/logout', authLogout)


export default Auth