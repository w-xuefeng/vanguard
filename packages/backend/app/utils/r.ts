import type { IUniReponse } from "./types"


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
