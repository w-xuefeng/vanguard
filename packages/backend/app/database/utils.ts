import { env } from "../utils/env";

export function isRedis() {
  return env.DB_TYPE === 'redis';
}

export function isSQLite() {
  return env.DB_TYPE === 'sqlite';
}
