export interface App {
  id: string
  rank: number
  name: string
  category: string
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
