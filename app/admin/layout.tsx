'use client';

import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <main className={`flex-1 overflow-y-auto ${isLoginPage ? 'p-0' : 'p-8'}`}>
                {children}
            </main>
        </div>
    );
}
