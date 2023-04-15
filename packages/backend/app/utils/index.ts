import type { Context } from "hono";
import { Base64 } from "js-base64";
import { logErr } from "./logger";
import { User } from "../database/type";

export function getClientIP(c: Context) {
  return '127.0.0.1';
}

export const JSONSafeParse = <T extends object = any>(
  text: string,
  reviver?: ((this: any, key: string, value: any) => any) | undefined,
) => {
  try {
    return JSON.parse(text, reviver) as T;
  } catch (error) {
    logErr(error, 'JSON.parse Error at JSONSafeParse: error:')
    return null;
  }
};

export const base64UrlEncode = (hashed: ArrayBuffer) => {
  const bytes = new Uint8Array(hashed);
  const base64encoded = Base64.fromUint8Array(bytes, true);
  return base64encoded;
};

export const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
};

export const encodeUserPassword = async (user: User) => {
  const hashed = await sha256(user.password);
  user.password = base64UrlEncode(hashed);
  return user
}
