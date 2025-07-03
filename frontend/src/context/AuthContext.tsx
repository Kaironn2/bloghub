'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser } from '@/lib/auth'

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('access')
    if (stored) {
      setAccessToken(stored)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password)
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    setAccessToken(data.access)
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
