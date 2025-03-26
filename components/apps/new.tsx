'use client'

import React from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { AppForm } from '@/components/apps/form'
import { createApp } from '@/actions/apps'

export default function AddAppPage() {
  async function onSubmit(formData: FormData) {
    return createApp(formData)
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
