import { useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/nav/navAdmin'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AdminLayout() {
    const { collapsed } = useSidebar()

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div
                className={`transition-all duration-300 min-h-screen w-full
                ${collapsed ? 'lg:ml-20' : 'lg:ml-72'}`}
            >
                <header className="h-20 w-full bg-uaa-blue shadow-md fixed top-0 z-10" />

                <main className="px-0 sm:px-6 py-6 pt-32">
                    <Toaster richColors position="bottom-right" />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

