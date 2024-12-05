export interface ICheckerResponse {
  next: boolean;
  message?: string;
}

export type TValueParser = "String" | "Number" | "Boolean";

export type TOperator =
  | "=="
  | "==="
  | ">"
  | ">="
  | "<"
  | "<="
  | "!="
  | "!=="
  | "includes"
  | "startsWith"
  | "endsWith"
  | "back-includes"
  | "back-startsWith"
  | "back-endsWith"
  | "any-includes"
  | "any-startsWith"
  | "any-endsWith";

export interface IBaseChecker<T> {
  type: T;
  expectValue: string | number;
  operator?: TOperator;
  message?: string;
  parseValue?: TValueParser;
  pattern?: string;
  patternFlags?: string;
}

export interface IQueriesChecker extends IBaseChecker<"queries"> {
  queryName: string;
  checkType?: "all" | "single";
  expectAllValue?: string[];
  index?: number;
}
export interface IQueryChecker extends IBaseChecker<"query"> {
  queryName: string;
}
export interface IHeadersChecker extends IBaseChecker<"headers"> {
  headerName: string;
}
export interface IBodyChecker extends IBaseChecker<"body"> {
  bodyType: "json" | "text" | "formData" | "blob";
  property?: string;
  fileProperty?: string;
}
export interface IRemoteChecker extends IBaseChecker<"remote"> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";
  headers?: Record<string, string>;
  body?: Record<string, string>;
  nextField?: string[];
  messageField?: string[];
  timeout?: number;
}

export interface IURLChecker extends IBaseChecker<"url"> {}
export interface IPathChecker extends IBaseChecker<"path"> {}
export interface ICustomExpressionChecker {
  type: "customExpression";
  expression: string;
}

export type IObjectChecker =
  | IQueriesChecker
  | IQueryChecker
  | IHeadersChecker
  | IBodyChecker
  | IURLChecker
  | IPathChecker
  | IRemoteChecker;

export type IChecker = string | IObjectChecker | ICustomExpressionChecker;
