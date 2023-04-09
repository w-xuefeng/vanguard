import type { Context } from "hono";
import { logErr } from "./logger";

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
