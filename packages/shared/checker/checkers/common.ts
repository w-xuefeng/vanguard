import type { Context } from "hono";
import type {
  IChecker,
  ICustomExpressionChecker,
  IObjectChecker,
  TOperator,
  TValueParser,
} from "../types";

export function getParser(valueParser?: TValueParser) {
  switch (valueParser) {
    case "String":
      return String;
    case "Number":
      return Number;
    case "Boolean":
      return Boolean;
    default:
      return (value: any) => value;
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
    data !== null &&
    ["[object File]", "[object Blob]"].includes(
      Object.prototype.toString.call(data),
    )
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
  originalValue: string | number | undefined | null,
  originalExpectValue: string | number,
  operator?: TOperator,
  valueParser?: TValueParser,
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

export function handleObjectChecker(
  originalValue: string | number | undefined | null,
  checker: IObjectChecker,
) {
  if (checker.pattern) {
    return new RegExp(checker.pattern, checker.patternFlags).test(
      String(originalValue),
    );
  }
  return transformOperator(
    originalValue,
    checker.expectValue,
    checker.operator,
    checker.parseValue,
  );
}

export function helperFunc(c: Context, text: string) {
  const headerRs = text.match(/\$header\((?<headerName>.+)\)/);
  if (headerRs?.groups?.headerName) {
    const value = c.req.header(headerRs.groups.headerName);
    return text.replace(/\$header\((?<headerName>.+)\)/, value || "");
  }
  const queryRs = text.match(/\$query\((?<queryName>.+)\)/);
  if (queryRs?.groups?.queryName) {
    const value = c.req.header(queryRs.groups.queryName);
    return text.replace(/\$query\((?<queryName>.+)\)/, value || "");
  }
  return text;
}
