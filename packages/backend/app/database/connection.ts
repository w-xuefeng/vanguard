import { env } from "../utils/env";
import { createClient } from "redis";
import { logErr, sLog } from "../utils/logger";
import { Database } from "bun:sqlite";
import prepareSQLite from "./prepare-sqlite";

export const RULE_SET_KEY = "vanguard-rules";
export const USER_SET_KEY = "vanguard-users";
export { RULE_SET_TABLE, USER_SET_TABLE } from './prepare-sqlite';


export async function connectRedis(cause?: string) {
  const client = createClient({ url: env.DBC });
  client.on("connect", async () => {
    await sLog(`Redis Client Connect ${cause ? `for ${cause}` : ""}`);
  });
  client.on("end", async () => {
    await sLog(`Redis Client Disconnect ${cause ? `by ${cause} end` : ""}`);
  });
  client.on("error", async (err) => {
    await logErr(err, "Redis Client Error:");
  });
  if (client.isReady || client.isOpen) {
    return client;
  }
  await client.connect();
  return client;
}

export async function connectSQLite(cause?: string) {
  const db = new Database(env.DBC || 'mydb.sqlite');
  prepareSQLite(db);
  await sLog(`SQLite Connect ${cause ? `for ${cause}` : ""}`);
  return db;
}

export async function closeSQLite(db: Database, cause?: string) {
  db.close(false);
  await sLog(`SQLite close ${cause ? `by ${cause} end` : ""}`);
}
