import type { Context } from "hono"
import type { StatusCode } from 'hono/utils/http-status';
import R from "../utils/r"
import { HTTP_CODE } from "./const"
import { logReq, sLog } from "../utils/logger"

export default async function proxyRequest(url: string, c: Context) {
  await sLog(`Proxy request: '${url}'`)
  const rs = await fetch(url, c.req.raw);
  await logReq(c, void 0, rs.status, await rs.clone().text());
  const headers: Record<string, any> = {}
  rs.headers.forEach((v, k) => { headers[k] = v })
  return c.newResponse(rs.body, rs.status as StatusCode, headers)
}

export async function notFound(c: Context) {
  await sLog(`NotFound request: '${c.req.url}'`)
  return c.json(
    R.fail(
      HTTP_CODE.NOT_FOUND,
      `${c.req.method} ${c.req.path} not found`,
    ))
}
