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
          <div className="flex justify-between items-center mb-6">
            <div>
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-40" />
            </div>
          </div>

          <Skeleton className="h-24 w-full mb-6" />

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>

          <Skeleton className="h-10 w-full mb-6" />

          <Skeleton className="h-[400px] w-full mb-6" />

          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px]" />
          </div>
        </main>
      </div>
    </div>
  )
}
