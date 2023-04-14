import { Hono } from "hono";
import { serveStatic } from 'hono/bun'
import { env } from '../../utils/env'
import {
  getAllGuardRule,
  getGuardRuleByPrefix,
  modifyGuardRule,
  postGuardRule,
  removeGuardRule,
  getUserByName,
  getAllUser,
  postUser,
  modifyUser,
  removeUser,
  login,
} from '../services/guard'

export function useInternalRouters(app: Hono) {
  app.get('/__internal/api/rule/prefix', getGuardRuleByPrefix)
  app.get('/__internal/api/rule/all', getAllGuardRule)
  app.post('/__internal/api/rule/add', postGuardRule)
  app.post('/__internal/api/rule/modify', modifyGuardRule)
  app.delete('/__internal/api/rule/remove', removeGuardRule)

  app.get('/__internal/api/user/name', getUserByName)
  app.get('/__internal/api/user/all', getAllUser)
  app.post('/__internal/api/user/add', postUser)
  app.post('/__internal/api/user/modify', modifyUser)
  app.delete('/__internal/api/user/remove', removeUser)

  app.post('/__internal/api/user/login', login)
}

export function useWebRouter(app: Hono) {
  if (env.__PROD__) {
    app.use('/_/*', serveStatic({ root: env.FE_PATH }))
    app.use('/_/*', serveStatic({ root: env.FE_PATH, path: '_/index.html' }))
    app.use('/favicon.ico', serveStatic({ root: env.FE_PATH, path: '_/favicon.ico' }))
  } else {
    app.get('/_/*', async c => c.redirect(env.FE_PATH))
    app.get('/favicon.ico', async c => c.redirect(`${env.FE_PATH}/_/favicon.ico`))
  }
}
