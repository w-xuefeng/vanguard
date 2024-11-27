import type { IChecker, ICustomExpressionChecker, TOperator } from "../types";

export function isCustomExpression(
  checker: IChecker,
): checker is ICustomExpressionChecker | string {
  return (
    typeof checker === "string" ||
    (checker.type === "customExpression" &&
      checker.expression !== null &&
      checker.expression !== void 0)
  );
}

export function isFile(data: FormDataEntryValue | null): data is File {
  return (
    data !== null && Object.prototype.toString.call(data) === "[object File]"
  );
}

export function blobDetection(
  blob: Blob | File,
  key: keyof Blob | keyof File,
  expectValue: string | number,
  operator?: TOperator,
) {
  const value = blob[key];
  if (typeof value === "string" || typeof value === "number") {
    return transformOperator(value, expectValue, operator);
  }
  return true;
}

export function transformOperator(
  value: File | string | number | undefined | null,
  expectValue: string | number,
  operator?: TOperator,
) {
  if (!operator) {
    return value == expectValue;
  }
  const valueNecessary = value !== null && value !== void 0;
  const map = {
    "==": value == expectValue,
    "===": value === expectValue,
    ">": valueNecessary && value > expectValue,
    ">=": valueNecessary && value >= expectValue,
    "<": valueNecessary && value < expectValue,
    "<=": valueNecessary && value <= expectValue,
    "!=": value != expectValue,
    "!==": value !== expectValue,
    includes: valueNecessary && String(value).includes(`${expectValue}`),
    startsWith: valueNecessary && String(value).startsWith(`${expectValue}`),
    endsWith: valueNecessary && String(value).endsWith(`${expectValue}`),
    "back-includes": String(expectValue).includes(`${value}`),
    "back-startsWith": String(expectValue).startsWith(`${value}`),
    "back-endsWith": String(expectValue).endsWith(`${value}`),
    "any-includes":
      (valueNecessary && String(value).includes(`${expectValue}`)) ||
      String(expectValue).includes(`${value}`),
    "any-startsWith":
      (valueNecessary && String(value).startsWith(`${expectValue}`)) ||
      String(expectValue).startsWith(`${value}`),
    "any-endsWith":
      (valueNecessary && String(value).endsWith(`${expectValue}`)) ||
      String(expectValue).endsWith(`${value}`),
  };
  return map[operator];
}
