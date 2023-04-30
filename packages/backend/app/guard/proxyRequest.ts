import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import R from "../utils/r";
import { HTTP_CODE } from "./const";
import { logFetch, sLog } from "../utils/logger";

export default async function proxyRequest(url: string, c: Context) {
  await sLog(`Proxy request: '${url}'`);
  const urlInstance = new URL(url);
  const headers = new Headers(c.req.headers);
  headers.set("host", urlInstance.host);
  if (!headers.has("trace-id")) {
    headers.set("trace-id", c.env.traceId);
  }
  const req = new Request(c.req.raw, new Request(url, { headers }));
  const rs = await fetch(req);
  await logFetch(c, c.env.traceId, url, rs.status, await rs.clone().text());
  return c.newResponse(rs.body, rs.status as StatusCode, rs.headers.toJSON());
}

export async function notFound(c: Context) {
  await sLog(`NotFound request: '${c.req.url}'`);
  return c.json(
    R.fail(
      HTTP_CODE.NOT_FOUND,
      `${c.req.method} ${c.req.path} not found`,
    ),
  );
}
