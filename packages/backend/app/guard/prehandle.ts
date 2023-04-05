import type { Context } from "hono";
import { queryGuardsByPrefix } from "../database";

export default async function prehandle(c: Context) {
  const path = c.req.path;
  const rawUrl = c.req.url;
  const prefix = path.split('/').at(1);

  const {
    banList = [],
    pickList = [],
    checkers = [],
    nextOrigin = ''
  } = await queryGuardsByPrefix(prefix);

  const urlInstance = new URL(rawUrl)
  const url = nextOrigin ? rawUrl.replace(urlInstance.origin, nextOrigin) : undefined

  return {
    url,
    checkers,
    ban: banList.includes(path),
    pick: pickList.includes(path),
  }
}
