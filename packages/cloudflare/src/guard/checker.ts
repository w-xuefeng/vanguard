import type { Context } from "hono";

export interface ICheckerResponse {
  next: boolean;
  message?: string;
}

export function check(c: Context, checkerFunc: string) {
  try {
    const checker = new Function("c", checkerFunc) as (
      c: Context,
    ) => ICheckerResponse;
    return checker(c);
  } catch (error) {
    let message = "[Checker runtime error]";
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
    }
    return {
      next: false,
      message,
    };
  }
}

export default function useCheck(c: Context, checkers: string[]) {
  let rs: ICheckerResponse = {
    next: true,
  };
  for (const checkerFunc of checkers) {
    rs = check(c, checkerFunc);
    if (!rs.next) {
      break;
    }
  }
  return rs;
}
