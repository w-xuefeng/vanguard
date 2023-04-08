import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { env } from './utils/env'
import { logReq } from './utils/logger'
import guards, { notFound } from './guard'
import R from './utils/r'

const app = new Hono()

app.use('*', logger());

app.get('/', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  logReq(c);
  return c.json(R.ok({ time: Date.now(), text: 'Hello world' }))
})

if (env.BUN_MODE === 'production') {
  app.use('/_/*', serveStatic({ root: env.FE_PATH }))
  app.use('/_/*', serveStatic({ root: env.FE_PATH, path: '_/index.html' }))
} else {
  app.get('/_/*', async c => c.redirect(env.FE_PATH))
}

app.all('*', guards)
app.notFound(notFound)

export default {
  port: env.BE_PORT,
  fetch: app.fetch,
}
