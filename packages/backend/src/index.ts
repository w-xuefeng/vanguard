import { Hono } from 'hono'
import { env } from './utils/env'

const app = new Hono()

app.get('/', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  return c.json({ success: true, code: 200, message: '', data: { time: Date.now(), text: 'Hello world' } })
})

export default {
  port: env.SERVER_PORT,
  fetch: app.fetch,
}
