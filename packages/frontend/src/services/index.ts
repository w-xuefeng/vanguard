import request from './request'

export function login(options: { name: string, password: string }) {
  return request.post<{ name: string, token: string }>('/__internal/api/user/login', options)
}
