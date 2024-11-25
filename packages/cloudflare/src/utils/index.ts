import type { Context } from "hono";
import { Base64 } from "js-base64";
import { logErr } from "./logger";
import { User } from "../database/type";

export function getClientIP(c: Context) {
  const XRealIP = c.req.header("X-Real-IP");
  const XForwardFor = c.req.header("X-Forwarded-For");
  if (XRealIP) {
    return XRealIP;
  }
  if (XForwardFor) {
    return XForwardFor;
  }
  return "127.0.0.1";
}

export const JSONSafeParse = <T extends object = any>(
  text: string,
  reviver?: ((this: any, key: string, value: any) => any) | undefined,
) => {
  try {
    return JSON.parse(text, reviver) as T;
  } catch (error) {
    logErr(error, "JSON.parse Error at JSONSafeParse: error:");
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
  return crypto.subtle.digest("SHA-256", data);
};

export const encodeUserPassword = async (user: User) => {
  console.log("before", user.password);
  const hashed = await sha256(user.password);
  console.log("hashed", hashed);
  user.password = base64UrlEncode(hashed);
  console.log("after", user.password);
  return user;
};

export const generateKey = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );
  return keyPair;
};

export const encryptText = async (text: string, key: CryptoKey) => {
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    new TextEncoder().encode(text),
  );
  return base64UrlEncode(encrypted);
};

export const decryptText = async (text: string, key: CryptoKey) => {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    Base64.toUint8Array(text),
  );
  return new TextDecoder().decode(decrypted);
};
