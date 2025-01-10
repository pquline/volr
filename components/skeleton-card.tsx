import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="mb-6">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-8" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between flex-grow">
            <div className="space-y-2 text-sm flex-grow">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex flex-col justify-end ml-4">
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
