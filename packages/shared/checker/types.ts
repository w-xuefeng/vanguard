export interface ICheckerResponse {
  next: boolean;
  message?: string;
}

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
  | IPathChecker;

export type IChecker = string | IObjectChecker | ICustomExpressionChecker;
