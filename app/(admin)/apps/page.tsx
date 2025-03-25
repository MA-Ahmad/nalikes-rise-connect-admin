import { DashboardHeader } from '@/components/dashboard/header'
import { Apps } from '@/components/apps/list'

export default function AppsPage() {
  return (
    <>
      <DashboardHeader title="Apps" titleHref="/apps" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Apps />
        </div>
      </div>
    </>
  )
}
