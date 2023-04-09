import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { env } from './utils/env'
import {
  getAllGuardRule,
  getGuardRuleByPrefix,
  postGuardRule
} from './web/services/guard'
import { logReq } from './utils/logger'
import guards, { notFound } from './guard'
import R from './utils/r'

const app = new Hono()

app.use('*', logger());

app.get('/', (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  logReq(c, next);
  return c.json(R.ok({ time: Date.now(), text: 'Hello world' }))
})

app.get('/__internal/api/ruls/prefix', getGuardRuleByPrefix)
app.get('/__internal/api/ruls/all', getAllGuardRule)
app.post('/__internal/api/ruls', postGuardRule)

if (env.BUN_MODE === 'production') {
  app.use('/_/*', serveStatic({ root: env.FE_PATH }))
  app.use('/_/*', serveStatic({ root: env.FE_PATH, path: '_/index.html' }))
  app.use('/favicon.ico', serveStatic({ root: env.FE_PATH, path: '_/favicon.png' }))
} else {
  app.get('/_/*', async c => c.redirect(env.FE_PATH))
  app.get('/favicon.ico', async c => c.redirect(`${env.FE_PATH}/_/favicon.png`))
}

app.all('*', guards)
app.notFound(notFound)

export default {
  port: env.BE_PORT,
  fetch: app.fetch,
}
