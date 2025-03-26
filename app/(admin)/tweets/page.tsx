import { DashboardHeader } from '@/components/dashboard/header'
import { Tweets } from '@/components/tweets/list'

export default function TweetsPage() {
  return (
    <>
      <DashboardHeader title="Tweets" titleHref="/tweets" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Tweets />
        </div>
      </div>
    </>
  )
}
