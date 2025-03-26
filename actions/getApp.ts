'use server'

import api from '@/services/api'
import { AxiosError } from 'axios'
import { AppResponse } from './apps'

export const getApp = async (id: string): Promise<AppResponse> => {
  try {
    const response = await api.get(`/apps/${id}`)
    return { success: true, app: response.data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch app',
      }
    }
    return {
      success: false,
      error: 'Failed to fetch app',
    }
  }
}
