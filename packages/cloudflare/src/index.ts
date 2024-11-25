import { Hono } from "hono";
import { logger } from "hono/logger";
import { logAppStart, logReq } from "./utils/logger";
import { useInternalRouters, useWebRouter } from "./web/routers";
import guards, { notFound } from "./guard";
import R from "./utils/r";

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use("*", logger());
app.get("/", (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  logReq(c, next);
  return c.json(R.ok({ time: Date.now(), text: "Hello world" }));
});
useInternalRouters(app);
useWebRouter(app);
app.all("*", guards);
app.notFound(notFound);
logAppStart();

export default app;
