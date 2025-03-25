import axios from 'axios'
import { getCookie } from '@/utils/cookie'
import { RISE_ADMIN_TOKEN } from '@/utils/constants'

// Create base axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3300/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getCookie(RISE_ADMIN_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
