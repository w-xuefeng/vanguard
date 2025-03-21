import type { Context, Next } from "hono";
import { HTTP_CODE, HTTP_MSG } from "./const";
import proxyRequest from "./proxyRequest";
import prehandle from "./prehandle";
import useCheck from "@vanguard/shared/checker";
import R, { allowCrossRequest } from "../utils/r";

export { notFound } from "./proxyRequest";

export default async function guards(
  c: Context<{ Bindings: CloudflareBindings }>,
  next: Next,
) {
  allowCrossRequest(c);
  const { url, ban, pick, checkers } = await prehandle(c);
  if (ban) {
    return c.json(R.fail(HTTP_CODE.BAN, HTTP_MSG.BAN));
  }
  if (!pick) {
    const rs = await useCheck(c, checkers);
    if (!rs.next) {
      return c.json(
        R.fail(HTTP_CODE.CHECK_FAIL, rs.message || HTTP_MSG.CHECK_FAIL),
      );
    }
  }
  return url ? await proxyRequest(url, c) : await next();
}
