import type { Context } from "hono";
import type {
  IBodyChecker,
  IObjectChecker,
  IHeadersChecker,
  IPathChecker,
  IQueriesChecker,
  IQueryChecker,
  IURLChecker,
  ICheckerResponse,
} from "../types";
import { blobDetection, isFile, handleObjectChecker } from "./common";

export function checkURL(c: Context, checker: IURLChecker) {
  return {
    next: handleObjectChecker(c.req.url, checker),
    message: checker.message,
  };
}

export function checkPath(c: Context, checker: IPathChecker) {
  return {
    next: handleObjectChecker(c.req.path, checker),
    message: checker.message,
  };
}

export function checkQueries(c: Context, checker: IQueriesChecker) {
  if (checker.checkType === "all" && Array.isArray(checker.expectAllValue)) {
    return {
      next: checker.expectAllValue.every((e) =>
        c.req.queries(checker.queryName)?.includes(e),
      ),
      message: checker.message,
    };
  }
  return {
    next: handleObjectChecker(
      c.req.queries(checker.queryName)?.at(checker.index || 0),
      checker,
    ),
    message: checker.message,
  };
}

export function checkQuery(c: Context, checker: IQueryChecker) {
  return {
    next: handleObjectChecker(c.req.query(checker.queryName), checker),
    message: checker.message,
  };
}

export function checkHeaders(c: Context, checker: IHeadersChecker) {
  return {
    next: handleObjectChecker(c.req.header(checker.headerName), checker),
    message: checker.message,
  };
}

export async function checkBody(c: Context, checker: IBodyChecker) {
  /**
   * max content length to check
   * 50MB
   * 50 * 1024 ** 2
   */
  const MAX_CONTENT_LENGTH = 52428800;

  const bodySize = Number(c.req.header("Content-Length"));

  if (bodySize > MAX_CONTENT_LENGTH) {
    return {
      next: false,
      message: "The request body is too large to detect",
    };
  }

  const textCheck = (text: string) => {
    return {
      next: handleObjectChecker(text, checker),
      message: checker.message,
    };
  };

  const jsonCheck = (json: Record<string, any>, key: string) => {
    return {
      next: handleObjectChecker(json[key], checker),
      message: checker.message,
    };
  };

  const formDataCheck = (formData: FormData, key: string, fileKey?: string) => {
    const data = formData.get(key);
    if (isFile(data)) {
      return fileKey && fileKey in data
        ? {
            next: blobDetection(
              data,
              fileKey as keyof File,
              checker.expectValue,
              checker.operator,
            ),
            message: checker.message,
          }
        : {
            next: false,
            message: "The file property is not supported",
          };
    }
    return {
      next: handleObjectChecker(data, checker),
      message: checker.message,
    };
  };

  const cloneRequest = c.req.raw.clone();

  if (checker.bodyType === "text") {
    const text = await cloneRequest.text();
    return textCheck(text);
  }

  if (checker.bodyType === "json" && checker.property) {
    const json = (await cloneRequest.json()) as Record<string, any>;
    return jsonCheck(json, checker.property);
  }

  if (checker.bodyType === "formData" && checker.property) {
    const formData = await cloneRequest.formData();
    return formDataCheck(formData, checker.property, checker.fileProperty);
  }

  if (
    checker.bodyType === "blob" &&
    (checker.property || checker.fileProperty)
  ) {
    const blob = await cloneRequest.blob();
    return {
      next: blobDetection(
        blob,
        (checker.property || checker.fileProperty) as keyof Blob,
        checker.expectValue,
        checker.operator,
      ),
      message: checker.message,
    };
  }

  return {
    next: false,
    message: "The request body type is not supported",
  };
}

export default function checkerSwitch(
  c: Context,
  checker: IObjectChecker,
): ICheckerResponse | Promise<ICheckerResponse> {
  switch (checker.type) {
    case "url":
      return checkURL(c, checker);
    case "path":
      return checkPath(c, checker);
    case "queries":
      return checkQueries(c, checker);
    case "query":
      return checkQuery(c, checker);
    case "body":
      return checkBody(c, checker);
    case "headers":
      return checkHeaders(c, checker);
  }
}
