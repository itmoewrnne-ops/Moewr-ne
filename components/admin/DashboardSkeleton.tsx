import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[60px] mb-1" />
                        <Skeleton className="h-3 w-[140px]" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
