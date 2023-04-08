import type { Context, Next } from 'hono';
import { env } from './env';
import { createPathSync, pathJoin, existsSync } from './file';
import { getClientIP } from '.';

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

export async function sLog(info: string, serverName = process.env.PROJECT_NAME) {
  const sn = serverName ? `[${serverName}] ` : '';
  await logToFile(`${sn}${info}`, env.LOG_PATH);
}

export async function logReq(c: Context, next?: Next) {
  await next?.()
  const User = c.req.headers.get('User-Agent')
  const status: number = c.res.status
  const ip = getClientIP(c)
  const log_string = `${ip} "${c.req.method} ${c.req.path}" ${String(status)} ${User}`
  const prefix = `${process.env.PROJECT_NAME}::logger ${new Date(Date.now()).toLocaleString('zh-CN', { hour12: false })}`
  await sLog(log_string, prefix)
}
