import { decryptText, encryptText, generateKey } from ".";
import { sLog } from "./logger";

const tokenKey = await generateKey();

export const decodeToken = async (token: string) => {
  if (token.startsWith("Bearer")) {
    token = token.slice(7);
  }
  try {
    const text = await decryptText(token, tokenKey.privateKey);
    const expiredTime = Number(text.split(".").at(-1));
    return {
      text: text.replace(`.${expiredTime}`, ""),
      expiredTime,
      expired: Date.now() - expiredTime >= 0,
    };
  } catch (error) {
    await sLog(
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

export const encodeToken = async (text: string) => {
  text = `${text}.${Date.now() + 30 * 24 * 60 ** 2 * 1000}`;
  const token = await encryptText(text, tokenKey.publicKey);
  return `Bearer ${token}`;
};
