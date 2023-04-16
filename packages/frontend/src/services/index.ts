import request from './request'
import type { IGuardRecord } from '@vanguard/shared/models/rule';

export function login(options: { name: string, password: string }) {
  return request.post<{ name: string, token: string }>('/__internal/api/user/login', options)
}

export function getAllRules() {
  return request.get<IGuardRecord[]>('/__internal/api/rule/all')
}
