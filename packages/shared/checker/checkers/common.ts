import type {
  IChecker,
  ICustomExpressionChecker,
  TOperator,
  TValueParser,
} from "../types";

export function getParser(valueParser: TValueParser) {
  switch (valueParser) {
    case "String":
      return String;
    case "Number":
      return Number;
    case "Boolean":
      return Boolean;
    default:
      return String;
  }
}

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
  valueParser?: TValueParser,
) {
  const value = blob[key];
  if (typeof value === "string" || typeof value === "number") {
    return transformOperator(value, expectValue, operator, valueParser);
  }
  return true;
}

export function transformOperator(
  originalValue: File | string | number | undefined | null,
  originalExpectValue: string | number,
  operator?: TOperator,
  valueParser: TValueParser = "String",
) {
  const parser = getParser(valueParser);
  const value = parser(originalValue);
  const expectValue = parser(originalExpectValue);

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
