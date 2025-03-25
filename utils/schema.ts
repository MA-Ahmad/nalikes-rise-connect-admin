import { z } from 'zod'

export const appSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  tvl: z.number().min(0, 'TVL must be a positive number'),
  change1D: z.number(),
  change7D: z.number(),
  change1M: z.number(),
  mcapTvl: z.number().min(0, 'MCAP/TVL must be a positive number'),
  revenue1D: z.number().min(0, 'Revenue (1D) must be a positive number'),
  revenue7D: z.number().min(0, 'Revenue (7D) must be a positive number'),
  revenue1M: z.number().min(0, 'Revenue (1M) must be a positive number'),
})
