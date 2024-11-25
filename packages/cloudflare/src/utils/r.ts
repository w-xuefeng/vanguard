import type { Context } from "hono";
import type { IUniResponse } from "./types";
import { logReqFail, logReqOk } from "./logger";
import { HTTP_CODE, HTTP_MSG } from "../guard/const";
import { decodeToken } from "./token";
import { UserDAO } from "../database/dao";

export default class R {
  static json<T>(option: IUniResponse<T>) {
    return option;
  }

  static ok<T>(data: T) {
    return this.json({
      success: true,
      code: 200,
      message: "success",
      data,
    });
  }

  static fail(code: number, message: string) {
    return this.json({
      success: false,
      code,
      message,
      data: null,
    });
  }
}

export async function bodyCheck(c: Context) {
  if (!c.req.raw.body) {
    await logReqFail(
      c,
      HTTP_CODE.MISSING_BODY,
      c.req.raw.body,
      HTTP_MSG.MISSING_BODY,
    );
    return {
      hasBody: false,
      res: c.json(R.fail(HTTP_CODE.MISSING_BODY, HTTP_MSG.MISSING_BODY)),
    };
  }
  return {
    hasBody: true,
    res: new Response(c.req.raw.body),
  };
}

export async function checkException(
  c: Context,
  judgement: boolean,
  exception: string | number | boolean | null | object,
  codeMsg: keyof typeof HTTP_CODE,
) {
  if (judgement) {
    await logReqFail(c, HTTP_CODE[codeMsg], exception, HTTP_MSG[codeMsg]);
    return {
      next: false,
      res: c.json(R.fail(HTTP_CODE[codeMsg], HTTP_MSG[codeMsg])),
    };
  }
  return {
    next: true,
  };
}

export async function useAuthInterceptor(c: Context) {
  const token = c.req.raw.headers.get("Authorization");

  const tokenExistCheck = await checkException(
    c,
    !token,
    token,
    "UNAUTHORIZED",
  );
  if (tokenExistCheck.res) {
    return tokenExistCheck;
  }

  const tokenInfo = await decodeToken(token!);
  const tokenExpiredCheck = await checkException(
    c,
    tokenInfo.expired || !tokenInfo.text,
    token,
    "AUTH_EXPIRED",
  );
  if (tokenExpiredCheck.res) {
    return tokenExpiredCheck;
  }

  const user = await UserDAO.getUserByName(c, tokenInfo.text);
  const tokenInvalidCheck = await checkException(
    c,
    !user?.value?.name,
    token,
    "ILLEGAL_ACCESS",
  );
  if (tokenInvalidCheck.res) {
    return tokenInvalidCheck;
  }

  await logReqOk(c, token, user);
  return {
    next: true as const,
    user,
    res: null,
  };
}
