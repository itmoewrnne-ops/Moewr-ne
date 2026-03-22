import UserForm from '@/components/admin/UserForm'

export default function NewUserPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New User</h1>
                <p className="text-muted-foreground">
                    Create a new user account with specific role permissions.
                </p>
            </div>
            <UserForm />
        </div>
    )
}
