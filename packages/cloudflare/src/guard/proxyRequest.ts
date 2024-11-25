import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import R from "../utils/r";
import { HTTP_CODE } from "./const";
import { logFetch, sLog } from "../utils/logger";

async function handleFetchLog(
  c: Context,
  req: Request<any, any>,
  rs: Response,
) {
  const reqType = req.headers.get("Content-Type");
  const rsType = rs.headers.get("Content-Type");
  const reqHeaders = JSON.stringify(
    Object.fromEntries(req.headers.entries()),
    null,
    2,
  );
  const rsHeaders = JSON.stringify(
    Object.fromEntries(rs.headers.entries()),
    null,
    2,
  );
  const logAbleTypes = [
    "application/x-www-form-urlencoded",
    "application/json",
    "text/",
  ];
  const reqLogAble = logAbleTypes.some((e) => reqType?.startsWith(e));
  const rsLogAble = logAbleTypes.some((e) => rsType?.startsWith(e));
  const logContent = [
    `[Request Content-Type]: ${reqType}`,
    `[Request Header]: ${reqHeaders}`,
    `[Request Body]: ${
      reqLogAble ? await req.text() : req.body ? "<UnsupportedLog>" : "not body"
    }`,
    `[Response Content-Type]: ${rsType}`,
    `[Response Header]: ${rsHeaders}`,
    `[Response Body]: ${
      rsLogAble ? await rs.text() : rs.body ? "<UnsupportedLog>" : "not body"
    }`,
  ].join("\n");
  logFetch(c, c.env.traceId, rs.url, rs.status, logContent);
}

export default async function proxyRequest(url: string, c: Context) {
  sLog(`Proxy request: '${url}'`);
  const urlInstance = new URL(url);
  const headers = new Headers(c.req.raw.headers);
  headers.set("host", urlInstance.host);
  if (!headers.has("trace-id")) {
    headers.set("trace-id", c.env.traceId);
  }
  const req = new Request(url, Object.assign({}, c.req.raw, { headers }));
  const rs = await fetch(req);
  await handleFetchLog(c, req.clone(), rs.clone());
  return c.newResponse(
    rs.body,
    rs.status as StatusCode,
    Object.fromEntries(rs.headers.entries()),
  );
}

export async function notFound(c: Context) {
  sLog(`NotFound request: '${c.req.url}'`);
  return c.json(
    R.fail(HTTP_CODE.NOT_FOUND, `${c.req.method} ${c.req.path} not found`),
  );
}
