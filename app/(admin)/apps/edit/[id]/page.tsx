import { getApp } from '@/actions/getApp'
import { EditAppForm } from '@/components/apps/edit-form'
import { DashboardHeader } from '@/components/dashboard/header'
import { notFound } from 'next/navigation'

export default async function EditAppPage(props: unknown) {
  const { params } = props as { params: { id: string } }
  const { id } = params
  const { success, app } = await getApp(id)

  if (!success || !app) {
    notFound()
  }

  return (
    <>
      <DashboardHeader
        title="Apps"
        titleHref="/apps"
        subTitle={`Edit ${app.name}`}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="relative h-full p-3 sm:p-6">
            <EditAppForm app={app} />
          </div>
        </div>
      </div>
    </>
  )
}
