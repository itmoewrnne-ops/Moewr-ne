import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import UserList from '@/components/admin/UserList'
import { Skeleton } from '@/components/ui/skeleton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')

    // Simple decoding to check role (in a real app, verify signature)
    let isAdmin = false
    if (token) {
        try {
            const payload = JSON.parse(atob(token.value.split('.')[1]))
            isAdmin = payload.role === 'ADMIN'
        } catch (e) {
            // Token invalid
        }
    }

    if (!isAdmin) {
        redirect('/admin')
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">
                        Manage system users and their roles.
                    </p>
                </div>
                <Link href="/admin/users/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>}>
                <UserList />
            </Suspense>
        </div>
    )
}
