'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { setCookie } from '@/utils/cookie'
import { RISE_ADMIN_TOKEN } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { showToast } from '@/utils/toast'
import api from '@/services/api'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)

    try {
      const response = await api.post('/admin/auth/login', { password })

      if (response.data.success) {
        const { token } = response.data
        setCookie(RISE_ADMIN_TOKEN, token)
        router.push('/apps')
      } else {
        showToast.error(response.data.error || 'Failed to authenticate')
        router.push('/login')
      }
    } catch (error) {
      console.error('Error during login:', error)
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-screen w-full items-center justify-center bg-background">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-transparent"></div>
        </div>
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-lg p-8"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Password Required
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={hasError ? 'border-red-500' : ''}
          />
          {hasError && (
            <p className="text-sm text-red-500">Incorrect password</p>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </motion.div>
    </div>
  )
}
