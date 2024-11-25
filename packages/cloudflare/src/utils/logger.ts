import type { Context, Next } from "hono";
import { HTTP_CODE } from "../guard/const";
import { getClientIP } from ".";

const PROJECT_NAME = "Vanguard";

export async function logToConsole(content: string) {
  console.log(content, "\n");
}

export function sLog(info: string, prefix?: string) {
  prefix =
    prefix ||
    `${PROJECT_NAME}::logger ${new Date(Date.now()).toLocaleString("zh-CN", {
      hour12: false,
    })}`;
  logToConsole(`[${prefix}] ${info}`);
}

export async function logErr(error: Error | any, prefix?: string) {
  sLog(
    `${prefix} ${
      error instanceof Error ? error.name || error.message : error?.toString?.()
    }`,
  );
}

export async function logReq(
  c: Context,
  next?: Next,
  statusCode?: number,
  result: string | number | boolean = "",
) {
  await next?.();
  const ua = c.req.header("User-Agent");
  const traceId = c.req.header("trace-id");
  const status: number = statusCode || c.res.status;
  const ip = getClientIP(c);
  const record = `${ip} ${
    traceId ? "trace-id: " + traceId : ""
  } "${c.req.method} ${c.req.path}" ${String(status)} ${ua} ${result}`;
  sLog(record);
}

export function logFetch(
  c: Context,
  traceId: string,
  url: string,
  statusCode?: number,
  content: string | number | boolean = "",
) {
  const ua = c.req.header("User-Agent");
  const status = statusCode;
  const ip = getClientIP(c);
  const record = `${ip} ${
    traceId ? "trace-id: " + traceId || c.req.header("trace-id") : ""
  } "${c.req.method} ${url}" ${String(status)} ${ua}\n${content}\n`;
  sLog(record);
}

export function logReqOk(
  c: Context,
  bodyOrQuery: string | number | boolean | null | object = "",
  result: string | number | boolean | null | object = "",
  next?: Next,
) {
  const req =
    typeof bodyOrQuery === "object" ? JSON.stringify(bodyOrQuery) : bodyOrQuery;
  const res = typeof result === "object" ? JSON.stringify(result) : result;
  logReq(c, next, HTTP_CODE.OK, `request:${req} response:${res}`);
}

export function logReqFail(
  c: Context,
  statusCode: number,
  bodyOrQuery: string | number | boolean | null | object = "",
  result: string | number | boolean | null | object = "",
  next?: Next,
) {
  const req =
    typeof bodyOrQuery === "object" ? JSON.stringify(bodyOrQuery) : bodyOrQuery;
  const res = typeof result === "object" ? JSON.stringify(result) : result;
  logReq(c, next, statusCode, `request:${req} response:${res}`);
}

export function logAppStart() {
  const info = `App started successfully`;
  sLog(info);
}
