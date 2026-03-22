import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import UserForm from '@/components/admin/UserForm'

interface EditUserPageProps {
    params: {
        id: string
    }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const user = await prisma.user.findUnique({
        where: { id: params.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    if (!user) {
        notFound()
    }

    // Ensure name is not null for the form
    const userData = {
        ...user,
        name: user.name || ''
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
                <p className="text-muted-foreground">
                    Update user details and role permissions.
                </p>
            </div>
            <UserForm initialData={userData} />
        </div>
    )
}
