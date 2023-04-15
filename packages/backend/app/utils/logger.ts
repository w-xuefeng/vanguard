import type { Context, Next } from 'hono';
import { env } from './env';
import { createPathSync, pathJoin, existsSync } from './file';
import { getClientIP } from '.';
import * as colors from 'colors';
import { HTTP_CODE } from '../guard/const';

export async function logToFile(content: string, rootPath: string) {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const az = (e: number) => e < 10 ? `0${e}` : e;
    const fileName = `${year}-${az(month)}-${az(day)}.log`;
    const logFile = pathJoin([rootPath, year], fileName);
    if (!existsSync(logFile)) {
      createPathSync('file', logFile);
    }
    const file = Bun.file(logFile)
    await Bun.write(logFile, `${await file.text()}${content}\n`)
  } catch {
    // ignore
  }
}

export async function sLog(info: string, prefix?: string) {
  prefix = prefix || `${process.env.PROJECT_NAME}::logger ${new Date(Date.now()).toLocaleString('zh-CN', { hour12: false })}`
  await logToFile(`[${prefix}] ${info}`, env.LOG_PATH);
}

export async function logErr(error: Error | any, prefix?: string) {
  await sLog(`${prefix} ${error instanceof Error ? error.name || error.message : error?.toString?.()}`)
}

export async function logReq(c: Context, next?: Next, statusCode?: number, result: string | number | boolean = '') {
  await next?.();
  const ua = c.req.headers.get('User-Agent')
  const traceId = c.req.headers.get('trace-id')
  const status: number = statusCode || c.res.status
  const ip = getClientIP(c)
  const record = `${ip} ${traceId ? 'trace-id: ' + traceId : ''} "${c.req.method} ${c.req.path}" ${String(status)} ${ua} ${result}`
  await sLog(record)
}

export async function logReqOk(
  c: Context,
  bodyOrQuery: string | number | boolean | null | object = '',
  result: string | number | boolean | null | object = '',
  next?: Next
) {
  const req = typeof bodyOrQuery === 'object' ? JSON.stringify(bodyOrQuery) : bodyOrQuery
  const res = typeof result === 'object' ? JSON.stringify(result) : result
  await logReq(c, next, HTTP_CODE.OK, `request:${req} response:${res}`)
}

export async function logReqFail(
  c: Context,
  statusCode: number,
  bodyOrQuery: string | number | boolean | null | object = '',
  result: string | number | boolean | null | object = '',
  next?: Next
) {
  const req = typeof bodyOrQuery === 'object' ? JSON.stringify(bodyOrQuery) : bodyOrQuery
  const res = typeof result === 'object' ? JSON.stringify(result) : result
  await logReq(c, next, statusCode, `request:${req} response:${res}`)
}

export async function logAppStart(port: string) {
  const info = `App started successfully at port ${port}`;
  console.log(colors.green(info));
  await sLog(info)
}
