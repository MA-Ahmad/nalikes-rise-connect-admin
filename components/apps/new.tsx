'use client'

import React from 'react'
import * as z from 'zod'
import { appSchema } from '@/utils/schema'
import { DashboardHeader } from '@/components/dashboard/header'
import { AppForm } from '@/components/apps/form'
import { createApp } from '@/actions/apps'

export default function AddAppPage() {
  async function onSubmit(values: z.infer<typeof appSchema>) {
    // const formData = new FormData()
    // Object.entries(values).forEach(([key, value]) => {
    //   if (value) {
    //     formData.append(key, value as string)
    //   }
    // })
    return createApp(values)
  }

  return (
    <>
      <DashboardHeader title="Apps" titleHref="/apps" subTitle="Add new app" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="relative h-full p-3 sm:p-6">
            <AppForm onSubmit={onSubmit} submitButtonText="Save" />
          </div>
        </div>
      </div>
    </>
  )
}
