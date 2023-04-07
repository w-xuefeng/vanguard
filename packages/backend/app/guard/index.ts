import type { Context } from "hono";
import { HTTP_CODE, HTTP_MSG } from "./const";
import proxyRequest, { notFound } from "./proxyRequest";
import prehandle from "./prehandle";
import useCheck from "./checker";
import R from "../utils/r";

export { notFound } from "./proxyRequest";

export default async function guards(c: Context) {
  const { url, ban, pick, checkers } = await prehandle(c);
  if (ban) {
    return c.json(R.fail(HTTP_CODE.BAN, HTTP_MSG.BAN));
  }
  if (!pick) {
    const rs = useCheck(c, checkers)
    if (!rs.next) {
      return c.json(R.fail(HTTP_CODE.CHECK_FAIL, rs.message || HTTP_MSG.CHECK_FAIL))
    }
  }
  return url ? proxyRequest(url, c.req.raw) : notFound(c);
}
