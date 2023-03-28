import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { env } from './utils/env'

const app = new Hono()

app.get('/', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  return c.json({ success: true, code: 200, message: '', data: { time: Date.now(), text: 'Hello world' } })
})

if (env.BUN_MODE === 'production') {
  app.use('/_/*', serveStatic({ root: env.FE_PATH }))
} else {
  app.get('/_', async c => c.redirect(env.FE_PATH))
}

app.all('*', (c) => {
  // return fetch(c.req.url, c.req.raw)
  return c.text('nice request')
})

export default {
  port: env.BE_PORT,
  fetch: app.fetch,
}
