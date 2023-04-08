import type { Context } from "hono";
import { IBPType, type IBPItem } from "../database/type";
import { getClientIP } from "../utils";

export function ban(c: Context, banList: IBPItem[]) {
  const path = c.req.path
  const ip = getClientIP(c)
  const hit = banList.find(item => {
    const banIP = item.type === IBPType.ip && item.content === ip;
    const banPath = item.type === IBPType.path && item.content === path;
    return banIP || banPath
  })
  return !!hit
}

export function pick(c: Context, pickList: IBPItem[]) {
  const path = c.req.path
  const ip = getClientIP(c)
  const hit = pickList.find(item => {
    const pickIP = item.type === IBPType.ip && item.content === ip;
    const pickPath = item.type === IBPType.path && item.content === path;
    return pickIP || pickPath
  })
  return !!hit
}
