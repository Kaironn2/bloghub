'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex text-white">
      <div className="hidden md:flex w-2/3 bg-black items-center justify-center p-10">
        <div className="text-left">
          <div className="text-2xl font-semibold tracking-widest text-purple-500 mb-2">⌘ BlogHub</div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-400 mt-4 max-w-sm">
            Acesse sua conta para gerenciar seus posts, categorias e análises.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-950 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Entrar</h1>
            <p className="text-sm text-gray-400 mt-1">
              Use seu nome de usuário e senha cadastrados
            </p>
          </div>

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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Ainda não tem uma conta?{' '}
            <Link
              href="/register"
              className="underline hover:text-purple-500"
            >
              Cadastre-se
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}
