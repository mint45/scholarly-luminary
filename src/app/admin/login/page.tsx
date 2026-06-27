'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email หรือ Password ไม่ถูกต้อง')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-5xl text-primary mb-4 block">admin_panel_settings</span>
          <h1 className="font-headline font-extrabold text-3xl text-on-surface">Admin Login</h1>
          <p className="text-on-surface-variant mt-2">Scholarly Luminary — หลังบ้าน</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface-container-lowest rounded-xl p-8 shadow-lg border border-outline-variant/15 space-y-5">
          {error && (
            <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary rounded-full font-bold text-lg hover:scale-[0.98] transition-transform disabled:opacity-60"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  )
}
