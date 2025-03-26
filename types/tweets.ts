export interface Tweet {
  id: string
  tweetId: string
  isRiseAccount: boolean
  createdAt: string
}

export interface Meta {
  totalTweets: number
  currentPage: number
  pageSize: number
  totalPages: number
}
