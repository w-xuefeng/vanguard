import { Context } from "hono";
import { JSONSafeParse } from "../../utils";
import { KEY_SET_KEY } from "../config";

class KeyDAOForKV {
  static async writeKey(
    c: Context<{ Bindings: CloudflareBindings }>,
    data: { publicKey: string; privateKey: string },
  ) {
    const content = JSON.stringify(data);
    await c.env.KV.put(KEY_SET_KEY, content);
    return 1;
  }

  static async readKey(c: Context<{ Bindings: CloudflareBindings }>): Promise<{
    publicKey: string;
    privateKey: string;
  } | null> {
    const rs = await c.env.KV.get(KEY_SET_KEY);
    if (!rs) {
      return null;
    }
    return JSONSafeParse(rs);
  }
}

function useKeyDAO() {
  return KeyDAOForKV;
}

export class KeyDAO {
  static writeKey(
    c: Context<{ Bindings: CloudflareBindings }>,
    data: { publicKey: string; privateKey: string },
  ) {
    return useKeyDAO().writeKey(c, data);
  }

  static readKey(c: Context<{ Bindings: CloudflareBindings }>): Promise<{
    publicKey: string;
    privateKey: string;
  } | null> {
    return useKeyDAO().readKey(c);
  }
}
