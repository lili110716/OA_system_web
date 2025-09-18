// src/utils/auth.ts

/**
 * 获取token
 */
export function getToken(): string | null {
  return localStorage.getItem('token')
}

/**
 * 移除token
 */
export function removeToken(): void {
  localStorage.removeItem('token')
}
