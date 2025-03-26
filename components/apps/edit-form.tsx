'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { AppForm } from './form'
import { appSchema } from '@/utils/schema'
import { App } from '@/types/apps'
import { updateApp } from '@/actions/apps'

interface EditAppFormProps {
  app: App
}

export function EditAppForm({ app }: EditAppFormProps) {
  const router = useRouter()

  // Format the data to match the form schema
  const initialData: z.infer<typeof appSchema> = {
    name: app.name,
    category: app.category as unknown as string as
      | 'LENDING'
      | 'LIQUID_STAKING'
      | 'RESTAKING'
      | 'DEXES',
    description: app.description,
    featured: app.featured,
    logo: app.logo,
    banner: app.banner,
    tvl: app.tvl,
    change1D: app.change1D,
    change7D: app.change7D,
    change1M: app.change1M,
    mcapTvl: app.mcapTvl,
    revenue1M: app.revenue1M,
    revenue7D: app.revenue7D,
    revenue1D: app.revenue1D,
  }

  async function onSubmit(formData: FormData) {
    const result = await updateApp(app.id, formData)

    if (result.success) {
      router.push('/apps')
    }

    return result
  }

  return (
    <AppForm
      initialData={initialData}
      onSubmit={onSubmit}
      submitButtonText="Update App"
    />
  )
}
