import { Hono } from 'hono'
import { env, srcPath } from './utils/env'

const app = new Hono()

app.get('/', (c) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  return c.json({ success: true, code: 200, message: '', data: { time: Date.now(), text: 'Hello world' } })
})

app.get('/_', async (c) => {
  if (env.BUN_MODE === 'production') {
    const text = await Bun.file(srcPath(env.FE_PATH)).text();
    return c.html(text)
  }
  return c.redirect(env.FE_PATH)
})

export default {
  port: env.BE_PORT,
  fetch: app.fetch,
}
