'use client'

import api from '@/services/api'
import { Tweet } from '@/types/tweets'
import { AxiosError } from 'axios'

export interface TweetResponse {
  success: boolean
  tweets?: Tweet[]
  meta?: {
    totalTweets: number
    currentPage: number
    pageSize: number
    totalPages: number
  }
  tweet?: Tweet
  error?: string
}

export const fetchTweets = async (
  page: number,
  pageSize: number
): Promise<TweetResponse> => {
  try {
    const response = await api.get(
      `/tweets?pageNumber=${page}&size=${pageSize}`
    )
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

export const createTweet = async (data: {
  tweetId: string
  isRiseAccount: boolean
}): Promise<TweetResponse> => {
  try {
    const response = await api.post('/tweets', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create tweet',
      }
    }
    return {
      success: false,
      error: 'Failed to create tweet',
    }
  }
}

export const updateTweet = async (
  id: string,
  data: { tweetId: string }
): Promise<TweetResponse> => {
  try {
    const response = await api.put(`/tweets/${id}`, data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update tweet',
      }
    }
    return {
      success: false,
      error: 'Failed to update tweet',
    }
  }
}

export const removeTweet = async (id: string): Promise<TweetResponse> => {
  try {
    const response = await api.delete(`/tweets/${id}`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove tweet',
      }
    }
    return {
      success: false,
      error: 'Failed to remove tweet',
    }
  }
}

export const getTweet = async (id: string): Promise<TweetResponse> => {
  try {
    const response = await api.get(`/tweets/${id}`)
    console.log(response.data)

    return { success: true, tweet: response.data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch tweet',
      }
    }
    return {
      success: false,
      error: 'Failed to fetch tweet',
    }
  }
}
