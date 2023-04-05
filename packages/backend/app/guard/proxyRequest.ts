import type { Context } from "hono"
import R from "../utils/r"
import { HTTP_CODE } from "./const"

export default function proxyRequest(url: string, request: Request) {
  return fetch(url, request)
}

export function notFound(c: Context) {
  return c.json(
    R.fail(
      HTTP_CODE.NOT_FOUND,
      `${c.req.method} ${c.req.path} not found`,
    ))
}
