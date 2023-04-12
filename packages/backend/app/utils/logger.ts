import type { Context, Next } from 'hono';
import { env } from './env';
import { createPathSync, pathJoin, existsSync } from './file';
import { getClientIP } from '.';
import * as colors from 'colors';

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

export async function logReq(c: Context, next?: Next, statusCode?: number, result: string = '') {
  await next?.();
  const ua = c.req.headers.get('User-Agent')
  const status: number = statusCode || c.res.status
  const ip = getClientIP(c)
  const record = `${ip} "${c.req.method} ${c.req.path}" ${String(status)} ${ua} ${result}`
  await sLog(record)
}

export async function logAppStart(port: string) {
  const info = `App started successfully at port ${port}`;
  console.log(colors.green(info));
  await sLog(info)
}
