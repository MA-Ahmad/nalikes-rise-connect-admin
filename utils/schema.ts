import { z } from 'zod'

export const AppCategory = {
  LENDING: 'LENDING',
  LIQUID_STAKING: 'LIQUID_STAKING',
  RESTAKING: 'RESTAKING',
  DEXES: 'DEXES',
} as const

// Custom file validation
const fileSchema = z.custom<File>((val) => val instanceof File, {
  message: 'Please upload a valid file',
})

export const appSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.enum([
    AppCategory.LENDING,
    AppCategory.LIQUID_STAKING,
    AppCategory.RESTAKING,
    AppCategory.DEXES,
  ]),
  description: z.string().min(1, 'Description is required'),
  logo: z.union([fileSchema, z.string()]).optional(),
  banner: z.union([fileSchema, z.string()]).optional(),
  featured: z.boolean().default(false),
  tvl: z.number().min(0, 'TVL must be a positive number'),
  change1D: z.number(),
  change7D: z.number(),
  change1M: z.number(),
  mcapTvl: z.number().min(0, 'MCAP/TVL must be a positive number'),
  revenue1D: z.number().min(0, 'Revenue (1D) must be a positive number'),
  revenue7D: z.number().min(0, 'Revenue (7D) must be a positive number'),
  revenue1M: z.number().min(0, 'Revenue (1M) must be a positive number'),
})
