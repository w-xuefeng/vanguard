import type { Context } from "hono"
import type { IUniReponse } from "./types"
import { logReqFail } from "./logger"
import { HTTP_CODE, HTTP_MSG } from "../guard/const"

export default class R {
  static json<T>(option: IUniReponse<T>) {
    return option
  }

  static ok<T>(data: T) {
    return this.json({
      success: true,
      code: 200,
      message: 'success',
      data,
    })
  }

  static fail(code: number, message: string) {
    return this.json({
      success: false,
      code,
      message,
      data: null,
    })
  }
}

export async function bodyCheck(c: Context) {
  if (!c.req.body) {
    await logReqFail(c, HTTP_CODE.MISSING_BODY, c.req.body, HTTP_MSG.MISSING_BODY)
    return {
      hasBody: false,
      res: c.json(R.fail(HTTP_CODE.MISSING_BODY, HTTP_MSG.MISSING_BODY))
    }
  }
  return {
    hasBody: true,
    res: new Response(c.req.body)
  }
}

export async function checkException(c: Context, judgement: boolean, exception: string | number | boolean | null | object, codeMsg: keyof typeof HTTP_CODE) {
  if (judgement) {
    await logReqFail(c, HTTP_CODE[codeMsg], exception, HTTP_MSG[codeMsg])
    return {
      next: false,
      res: c.json(R.fail(HTTP_CODE[codeMsg], HTTP_MSG[codeMsg]))
    }
  }
  return {
    next: true,
  }
}
