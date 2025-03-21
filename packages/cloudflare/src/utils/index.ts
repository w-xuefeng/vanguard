import type { Context } from "hono";
import { Base64 } from "js-base64";
import { logErr } from "./logger";
import { User } from "../database/type";
import { KeyDAO } from "../database/dao/key-dao";

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

export const generateKey = async (
  c: Context<{ Bindings: CloudflareBindings }>,
) => {
  const preKey = await KeyDAO.readKey(c);
  if (preKey?.publicKey && preKey?.privateKey) {
    return importKeys(preKey.publicKey, preKey.privateKey);
  }
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
  const keys = await exportKeys(keyPair as CryptoKeyPair);
  await KeyDAO.writeKey(c, keys);
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

export async function exportKeys(keyPair: CryptoKeyPair) {
  const publicKey = (await crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey,
  )) as ArrayBuffer;
  const privateKey = (await crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey,
  )) as ArrayBuffer;

  return {
    publicKey: Base64.fromUint8Array(new Uint8Array(publicKey)),
    privateKey: Base64.fromUint8Array(new Uint8Array(privateKey)),
  };
}

export async function importKeys(
  publicKeyData: string,
  privateKeyData: string,
) {
  const publicKeyBinary = Base64.toUint8Array(publicKeyData);
  const privateKeyBinary = Base64.toUint8Array(privateKeyData);

  const publicKey = await crypto.subtle.importKey(
    "spki",
    publicKeyBinary,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"],
  );

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBinary,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"],
  );

  return { publicKey, privateKey };
}
