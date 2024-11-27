import { type Context } from "hono";
import { decryptText, encryptText, generateKey } from ".";
import { sLog } from "./logger";

export const decodeToken = async (
  c: Context<{ Bindings: CloudflareBindings }>,
  token: string,
) => {
  if (token.startsWith("Bearer")) {
    token = token.slice(7);
  }
  try {
    const tokenKey = await generateKey(c);
    const text = await decryptText(
      token,
      (tokenKey as CryptoKeyPair).privateKey,
    );
    const expiredTime = Number(text.split(".").at(-1));
    return {
      text: text.replace(`.${expiredTime}`, ""),
      expiredTime,
      expired: Date.now() - expiredTime >= 0,
    };
  } catch (error) {
    sLog(
      `[Decode Token Error] "${token}" ${
        error instanceof Error ? error.name || error.message : ""
      }`,
    );
    return {
      text: "",
      expiredTime: Date.now(),
      expired: true,
    };
  }
};

export const encodeToken = async (
  c: Context<{ Bindings: CloudflareBindings }>,
  text: string,
) => {
  const tokenKey = await generateKey(c);
  text = `${text}.${Date.now() + 30 * 24 * 60 ** 2 * 1000}`;
  const token = await encryptText(text, (tokenKey as CryptoKeyPair).publicKey);
  return `Bearer ${token}`;
};
