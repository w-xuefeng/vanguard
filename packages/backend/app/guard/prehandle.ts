import type { Context, Next } from "hono";
import { queryGuardsByPrefix } from "../database";
import { ban, pick } from "./bp";

export default async function prehandle(c: Context) {
  const path = c.req.path;
  const rawUrl = c.req.url;
  const prefix = path.split("/").at(1);

  const {
    banList = [],
    pickList = [],
    checkers = [],
    nextOrigin = "",
    ignorePrefix = false,
  } = await queryGuardsByPrefix(prefix);

  const urlInstance = new URL(rawUrl);
  const url = nextOrigin
    ? rawUrl.replace(urlInstance.origin, nextOrigin)
    : undefined;

  return {
    url: url && prefix && ignorePrefix ? url.replace(`/${prefix}`, "") : url,
    checkers,
    ban: ban(c, banList),
    pick: pick(c, pickList),
  };
}
