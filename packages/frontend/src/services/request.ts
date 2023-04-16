import { history } from "umi";
import { LDK } from "@/config/dict";
import { useStorage } from "@/utils";
import { nanoid } from "nanoid";
import { HTTP_CODE } from "@vanguard/shared/types/const";
import { notification } from "@/utils/toast";
import type { IUniResponse } from "@vanguard/shared/types";

interface ICustomRequestInit extends RequestInit {
  silentBusinessError: boolean;
  silentError: boolean;
  customErrorMsg: string;
}

type TMethods = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "OPTIONS";

const timerRef = {
  timer: void 0 as number | undefined,
  visible: false,
};

function uniErrorHandle(error: unknown, config?: Partial<ICustomRequestInit>) {
  if (config?.silentError) {
    return;
  }

  if (!timerRef.visible) {
    timerRef.visible = true;
    clearTimeout(timerRef.timer);
    notification.error({
      message: "请求异常",
      description: config?.customErrorMsg ||
        (error instanceof Error
          ? error.name || error.message
          : "Request Error"),
    });
    timerRef.timer = window.setTimeout(() => {
      timerRef.visible = false;
    }, 3000);
  }
}

function uniBusinessErrorHandle<T>(
  data: IUniResponse<T>,
  config?: Partial<ICustomRequestInit>,
) {
  if (
    [HTTP_CODE.UNAUTHORIZED, HTTP_CODE.AUTH_EXPIRED, HTTP_CODE.ILLEGAL_ACCESS]
      .includes(data.code)
  ) {
    useStorage.removeStorage(LDK.TOKEN);
    useStorage.removeStorage(LDK.USER);
    history.replace("/login");
  }

  if (!timerRef.visible && !config?.silentBusinessError) {
    timerRef.visible = true;
    clearTimeout(timerRef.timer);
    notification.error({
      message: "请求业务异常",
      description: config?.customErrorMsg || data.message ||
        "Business Exception",
    });
    timerRef.timer = window.setTimeout(() => {
      timerRef.visible = false;
    }, 3000);
  }
}

function baseRequest<T, D extends Record<string, any>>(
  method: TMethods,
  url: string,
  data?: D,
  config?: Partial<ICustomRequestInit>,
) {
  const abortController = new AbortController();
  const token = useStorage.getStorage<string>(LDK.TOKEN);
  const headers = new Headers({
    "Content-Type": "application/json",
    "trace-id": nanoid(),
    ...config?.headers,
  });
  if (token) {
    headers.set("Authorization", token);
  }
  const requestInit = {
    method,
    headers,
    signal: abortController.signal,
    ...config,
  };
  if (data) {
    requestInit.body = JSON.stringify(data);
  }
  const req = () =>
    fetch(url, requestInit).then((rs) => rs.json() as Promise<IUniResponse<T>>)
      .then((rs) => {
        if (!rs.success) {
          uniBusinessErrorHandle<T>(rs, config);
        }
        return rs;
      }).catch((err) => {
        uniErrorHandle(err, config);
        return {
          code: err?.code,
          message: "",
          success: false,
          data: null,
        } as IUniResponse<null>;
      });
  return {
    req,
    abortController,
  };
}

export function fetchGet<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<ICustomRequestInit>,
) {
  const queries = new URLSearchParams(data);
  const connectionSymbol = url.includes("?") ? "&" : "?";
  return baseRequest<T, D>(
    "GET",
    `${url}${connectionSymbol}${queries}`,
    void 0,
    config,
  );
}

export function fetchPost<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<RequestInit>,
) {
  return baseRequest<T, D>("POST", url, data, config);
}

export function fetchDelete<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<RequestInit>,
) {
  return baseRequest<T, D>("DELETE", url, data, config);
}

export function fetchPatch<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<RequestInit>,
) {
  return baseRequest<T, D>("PATCH", url, data, config);
}

export function fetchPut<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<RequestInit>,
) {
  return baseRequest<T, D>("PUT", url, data, config);
}

export function fetchOptions<T, D extends Record<string, any> = any>(
  url: string,
  data?: D,
  config?: Partial<RequestInit>,
) {
  return baseRequest<T, D>("OPTIONS", url, data, config);
}

export const request = {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  patch: fetchPatch,
  delete: fetchDelete,
  options: fetchOptions,
};

export default request;
