const AUTH_KEY = 'tw_mock_auth'
const CREDENTIALS = {
  username: import.meta.env.VITE_MOCK_USERNAME ?? 'admin',
  password: import.meta.env.VITE_MOCK_PASSWORD ?? 'Workforce2026@',
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function signIn(username: string, password: string): boolean {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    sessionStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function signOut(): void {
  sessionStorage.removeItem(AUTH_KEY)
}
