import { Hono } from "hono";
import {
  getAllGuardRule,
  getAllUser,
  getGuardRuleByPrefix,
  getUserByName,
  login,
  modifyGuardRule,
  modifyUser,
  postGuardRule,
  postUser,
  removeGuardRule,
  removeUser,
} from "../services/guard";

export function useInternalRouters(
  app: Hono<{ Bindings: CloudflareBindings }>,
) {
  app.get("/__internal/api/rule/prefix", getGuardRuleByPrefix);
  app.get("/__internal/api/rule/all", getAllGuardRule);
  app.post("/__internal/api/rule/add", postGuardRule);
  app.post("/__internal/api/rule/modify", modifyGuardRule);
  app.delete("/__internal/api/rule/remove", removeGuardRule);

  app.get("/__internal/api/user/name", getUserByName);
  app.get("/__internal/api/user/all", getAllUser);
  app.post("/__internal/api/user/add", postUser);
  app.post("/__internal/api/user/modify", modifyUser);
  app.delete("/__internal/api/user/remove", removeUser);

  app.post("/__internal/api/user/login", login);
}

export function useWebRouter(app: Hono<{ Bindings: CloudflareBindings }>) {
  app.get("/_/*", async (ctx) => {
    const rs = await ctx.env.ASSETS.fetch(ctx.req.raw);
    if (rs.status === 404) {
      return ctx.redirect("/_/index.html");
    }
    return rs;
  });
}
