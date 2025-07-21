import { useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/nav/navAdmin'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AdminLayout() {
    const { collapsed } = useSidebar()

    return (
        <div className="flex">
            <Sidebar />

            <main
                className={`transition-all duration-300 min-h-screen w-full px-4 sm:px-6 py-6 ${collapsed ? 'lg:pl-20' : 'lg:pl-72'
                    }`}
            >
                <Toaster richColors position="bottom-right" />

                <Outlet />
            </main>
        </div>
    )
}

