import type { Context } from "hono";
import { type IBPItem, IBPType } from "../database/type";
import { getClientIP } from "../utils";

export function ban(c: Context, banList: IBPItem[]) {
  const path = c.req.path;
  const ip = getClientIP(c);
  const hit = banList.find((item) => {
    const banIP = item.type === IBPType.ip && item.content === ip;
    const banPath = item.type === IBPType.path && item.content === path;
    const banIPath = item.type === IBPType.ipath && (() => {
      const [confIP, confPath] = item.content.split('|');
      return confIP === ip && confPath === path;
    })();
    return banIP || banPath || banIPath;
  });
  return !!hit;
}

export function pick(c: Context, pickList: IBPItem[]) {
  const path = c.req.path;
  const ip = getClientIP(c);
  const hit = pickList.find((item) => {
    const pickIP = item.type === IBPType.ip && item.content === ip;
    const pickPath = item.type === IBPType.path && item.content === path;
    const pickIPath = item.type === IBPType.ipath && (() => {
      const [confIP, confPath] = item.content.split('|');
      return confIP === ip && confPath === path;
    })();
    return pickIP || pickPath || pickIPath;
  });
  return !!hit;
}
