import { Hono } from "hono";
import { serveStatic } from 'hono/bun'
import { env } from '../../utils/env'
import {
  getAllGuardRule,
  getGuardRuleByPrefix,
  modifyGuardRule,
  postGuardRule,
  removeGuardRule
} from '../services/guard'

export function useInternalRouters(app: Hono) {
  app.get('/__internal/api/ruls/prefix', getGuardRuleByPrefix)
  app.get('/__internal/api/ruls/all', getAllGuardRule)
  app.post('/__internal/api/ruls/add', postGuardRule)
  app.post('/__internal/api/ruls/modify', modifyGuardRule)
  app.delete('/__internal/api/ruls/remove', removeGuardRule)
}

export function useWebRouter(app: Hono) {
  if (env.__PROD__) {
    app.use('/_/*', serveStatic({ root: env.FE_PATH }))
    app.use('/_/*', serveStatic({ root: env.FE_PATH, path: '_/index.html' }))
    app.use('/favicon.ico', serveStatic({ root: env.FE_PATH, path: '_/favicon.png' }))
  } else {
    app.get('/_/*', async c => c.redirect(env.FE_PATH))
    app.get('/favicon.ico', async c => c.redirect(`${env.FE_PATH}/_/favicon.png`))
  }
}
