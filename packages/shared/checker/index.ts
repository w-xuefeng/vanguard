import type { Context } from "hono";
import type { IChecker, ICheckerResponse } from "./types";
import checkerSwitch from "./checkers";
import { isCustomExpression } from "./checkers/common";

export function check(c: Context, checker: IChecker) {
  const handleError = (error: unknown) => {
    let message = "[Checker runtime error]";
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
    }
    return {
      next: false,
      message,
    } as ICheckerResponse;
  };

  if (isCustomExpression(checker)) {
    const checkerFuncString =
      typeof checker === "string" ? checker : checker.expression;
    try {
      const checkerFunc = new Function("c", checkerFuncString) as (
        c: Context,
      ) => ICheckerResponse;
      return checkerFunc(c);
    } catch (error) {
      return handleError(error);
    }
  }

  if (typeof checker !== "object") {
    return {
      next: false,
      message: "[Checker rules error] Checker must be an object or a string",
    } as ICheckerResponse;
  }

  try {
    return checkerSwitch(c, checker);
  } catch (error) {
    return handleError(error);
  }
}

export default async function useCheck(c: Context, checkers: IChecker[]) {
  let rs: ICheckerResponse = {
    next: true,
  };
  for (const checker of checkers) {
    rs = await check(c, checker);
    if (!rs.next) {
      break;
    }
  }
  return rs;
}
