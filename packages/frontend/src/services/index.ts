import request from "./request";
import type { IGuardRecord } from "@vanguard/shared/models/rule";

export function login(options: { name: string; password: string }) {
  return request.post<{ name: string; token: string }>(
    "/__internal/api/user/login",
    options,
  );
}

export function getAllRules() {
  return request.get<IGuardRecord[]>("/__internal/api/rule/all");
}

export function getRulesByPrefix(prefix: string) {
  return request.get<IGuardRecord>("/__internal/api/rule/prefix", { prefix });
}

export function modifyRule(prefix: string, next: IGuardRecord) {
  return request.post<number>("/__internal/api/rule/modify", {
    prefix,
    next,
  });
}

export function addRule(rule: IGuardRecord) {
  return request.post<number>("/__internal/api/rule/add", rule);
}

export function removeRule(prefix: string) {
  return request.delete<number>("/__internal/api/rule/remove", { prefix });
}
