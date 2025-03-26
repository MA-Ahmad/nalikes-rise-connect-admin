'use client'

import { useState, useEffect } from 'react'
import api from '../services/api'
import { RISE_ADMIN_TOKEN } from '@/utils/constants'
import { removeCookie } from '@/utils/cookie'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/admin/auth/status')
      setUserLoggedIn(data.userLoggedIn)
      // if (data.userLoggedIn) {
      //   router.push('/apps')
      // }
    } catch (err) {
      setUserLoggedIn(false)
      const error = err as AxiosError
      if (error.response?.status !== 401) {
        setError('Failed to verify authentication')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const logout = async () => {
    try {
      await api.post('/admin/auth/logout')
      removeCookie(RISE_ADMIN_TOKEN)
      removeCookie('adminToken')
      removeCookie('rise_admin_auth')

      // Force clear the token from document.cookie as well
      document.cookie =
        'rise_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'

      console.log('logged out')

      setUserLoggedIn(false)
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return { userLoggedIn, loading, error, logout }
}
