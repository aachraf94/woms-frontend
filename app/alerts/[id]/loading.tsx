import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-10 mr-4" />
            <div className="flex-1">
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-40" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Skeleton className="h-[400px] md:col-span-2" />
            <Skeleton className="h-[400px]" />
          </div>

          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </main>
      </div>
    </div>
  )
}
