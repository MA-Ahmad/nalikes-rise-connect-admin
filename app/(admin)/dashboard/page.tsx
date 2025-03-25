import { DashboardHeader } from '@/components/dashboard/header'

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        titleHref="/admin"
        subTitle="Overview"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-zinc-100/50 dark:bg-zinc-800/50 aspect-video rounded-xl" />
          <div className="bg-zinc-100/50 dark:bg-zinc-800/50 aspect-video rounded-xl" />
          <div className="bg-zinc-100/50 dark:bg-zinc-800/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {/* Page content */}
        </div>
      </div>
    </>
  )
}
