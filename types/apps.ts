import { AppCategory } from '@/utils/schema'

export interface App {
  id: string
  description: string
  featured: boolean
  logo?: string
  banner?: string
  rank: number
  name: string
  category: typeof AppCategory
  tvl: number
  change1D: number
  change7D: number
  change1M: number
  mcapTvl: number
  revenue1D: number
  revenue7D: number
  revenue1M: number
  createdAt: string
}

export interface Meta {
  totalApps: number
  currentPage: number
  pageSize: number
  totalPages: number
}
