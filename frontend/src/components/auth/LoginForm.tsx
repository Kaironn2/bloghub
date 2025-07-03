'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { loginUser } from '@/lib/auth'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await loginUser(username, password)
      console.log('Login OK:', data)

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      window.location.href = '/'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-gray-900 border border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          Entrar no Blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
