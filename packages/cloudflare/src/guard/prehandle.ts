import type { Context } from "hono";
import { queryGuardsByPrefix } from "../database";
import { ban, pick } from "./bp";
import { nanoid } from "nanoid";

export function handleTrace(c: Context<{ Bindings: CloudflareBindings }>) {
  c.env.traceId = c.req.header("trace-id") || nanoid(36);
}

export default async function prehandle(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const path = c.req.path;
  const rawUrl = c.req.url;
  const prefix = path.split("/").at(1);
  handleTrace(c);

  const {
    banList = [],
    pickList = [],
    checkers = [],
    nextOrigin = "",
    ignorePrefix = false,
  } = await queryGuardsByPrefix(c, prefix);

  const urlInstance = new URL(rawUrl);
  /**
   * the next origin must endsWith '/' if request url with search and pathname endsWithout '/'
   */
  const nextOriginString =
    urlInstance.search && !urlInstance.pathname.endsWith("/")
      ? `${nextOrigin}/`
      : nextOrigin;
  const url = nextOrigin
    ? ignorePrefix
      ? rawUrl.replace(`${urlInstance.origin}/${prefix}`, nextOriginString)
      : rawUrl.replace(urlInstance.origin, nextOriginString)
    : undefined;

  return {
    url,
    checkers,
    ban: ban(c, banList),
    pick: pick(c, pickList),
  };
}
