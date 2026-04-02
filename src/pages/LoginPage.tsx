import React, { useState } from 'react'

const TRACK_LOGO_URL = 'https://res.cloudinary.com/hkldfk58b/image/upload/v1666933718/sx1vjp0836o280ivvwgi.png'
const CORRECT_ID = 'track'
const CORRECT_PASS = 'track-showcase'

interface LoginPageProps {
  onAuth: () => void
}

export function LoginPage({ onAuth }: LoginPageProps) {
  const [id, setId] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id === CORRECT_ID && pass === CORRECT_PASS) {
      sessionStorage.setItem('track-auth', '1')
      onAuth()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <img src={TRACK_LOGO_URL} alt="Track" className="h-8 object-contain" />
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
          <h1 className="text-lg font-semibold text-neutral-900 mb-1 text-center">Demo Showcase</h1>
          <p className="text-sm text-neutral-500 text-center mb-6">アクセスするには認証が必要です</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">ID</label>
              <input
                type="text"
                value={id}
                onChange={e => { setId(e.target.value); setError(false) }}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-[#1A58AF] focus:ring-1 focus:ring-[#1A58AF]"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">パスワード</label>
              <input
                type="password"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(false) }}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-[#1A58AF] focus:ring-1 focus:ring-[#1A58AF]"
              />
            </div>
            {error && (
              <p className="text-xs text-red-500">IDまたはパスワードが正しくありません</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1A58AF] text-white rounded-lg text-sm font-medium hover:bg-[#1648a0] transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
