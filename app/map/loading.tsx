import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 bg-gray-50 relative p-6">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-40" />
          </div>

          <Skeleton className="h-[calc(100vh-8rem)] w-full rounded-md" />
        </main>
      </div>
    </div>
  )
}
