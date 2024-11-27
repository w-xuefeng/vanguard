import { JSONSafeParse } from "../../utils";
import {
  closeSQLite,
  connectRedis,
  connectSQLite,
  KEYS_SET_KEY,
} from "../connection";
import { KEY_SET_TABLE } from "../prepare-sqlite";
import { isRedis, isSQLite } from "../utils";

class KeyDAOForRedis {
  static async writeKey(data: { publicKey: string; privateKey: string }) {
    const content = JSON.stringify(data);
    const client = await connectRedis(`[KeyDAO] Adding ${content} record`);
    const rs = await client.set(KEYS_SET_KEY, content);
    await client.disconnect();
    return rs;
  }

  static async readKey(): Promise<{
    publicKey: string;
    privateKey: string;
  } | null> {
    const client = await connectRedis(`[KeyDAO] Reading key record`);
    const rs = await client.get(KEYS_SET_KEY);
    await client.disconnect();
    return rs ? JSONSafeParse(rs) : null;
  }
}

class KeyDAOForSQLite {
  static async writeKey(data: { publicKey: string; privateKey: string }) {
    const content = JSON.stringify(data);
    const cause = `[KeyDAO] Adding '${content}' record`;
    const db = await connectSQLite(cause);
    const insert = db.prepare(
      `INSERT INTO ${KEY_SET_TABLE} (name, value) VALUES ($name, $value)`,
    );
    const insertKeys = db.transaction((iKeys) => {
      for (const key of iKeys) insert.run(key);
      return iKeys.length;
    });
    const count = insertKeys(
      Object.keys(data).map((e) => ({ $name: e, $value: data[e] })),
    );
    await closeSQLite(db, cause);
    return count;
  }

  static async readKey(): Promise<{
    publicKey: string;
    privateKey: string;
  } | null> {
    const cause = `[KeyDAO] Reading key record`;
    const db = await connectSQLite(cause);
    const rs = db.prepare(`SELECT * FROM ${KEY_SET_TABLE}`).all();
    await closeSQLite(db, cause);
    if (!rs || !rs.length) {
      return null;
    }
    return (rs as { name: string; value: string }[]).reduce(
      (
        total: {
          publicKey: string;
          privateKey: string;
        },
        cv,
      ) => {
        total[cv.name] = cv.value;
        return total;
      },
      {
        publicKey: "",
        privateKey: "",
      },
    );
  }
}

function defaultKeyDAO() {
  return KeyDAOForSQLite;
}

function useKeyDAO() {
  return isRedis()
    ? KeyDAOForRedis
    : isSQLite()
      ? KeyDAOForSQLite
      : defaultKeyDAO();
}

export class KeyDAO {
  static writeKey(data: { publicKey: string; privateKey: string }) {
    return useKeyDAO().writeKey(data);
  }

  static readKey(): Promise<{
    publicKey: string;
    privateKey: string;
  } | null> {
    return useKeyDAO().readKey();
  }
}
