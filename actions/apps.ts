'use client'

import api from '@/services/api'
import { App } from '@/types/apps'
import { AxiosError } from 'axios'

export interface AppResponse {
  success: boolean
  apps?: App[]
  meta?: {
    totalApps: number
    currentPage: number
    pageSize: number
    totalPages: number
  }
  app?: App
  error?: string
}

export const fetchApps = async (
  page: number,
  pageSize: number
): Promise<AppResponse> => {
  try {
    const response = await api.get(`/apps?pageNumber=${page}&size=${pageSize}`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch apps',
      }
    }
    return {
      success: false,
      error: 'Failed to fetch apps',
    }
  }
}

export const createApp = async (data: FormData): Promise<AppResponse> => {
  try {
    const response = await api.post('/apps', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create app',
      }
    }
    return {
      success: false,
      error: 'Failed to create app',
    }
  }
}

export const updateApp = async (
  id: string,
  data: FormData
): Promise<AppResponse> => {
  try {
    const response = await api.put(`/apps/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update app',
      }
    }
    return {
      success: false,
      error: 'Failed to update app',
    }
  }
}

export const removeApp = async (id: string): Promise<AppResponse> => {
  try {
    const response = await api.delete(`/apps/${id}`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove app',
      }
    }
    return {
      success: false,
      error: 'Failed to remove app',
    }
  }
}

// export const getApp = async (id: string): Promise<AppResponse> => {
//   try {
//     const response = await api.get(`/apps/${id}`)
//     console.log(response.data)

//     return { success: true, app: response.data }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Failed to fetch app',
//       }
//     }
//     return {
//       success: false,
//       error: 'Failed to fetch app',
//     }
//   }
// }
