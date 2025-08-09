import { useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/nav/navAdmin'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useThemeContext } from '@/context/ThemeContext'

export default function AdminLayout() {
    const { collapsed } = useSidebar()
    const { isDark } = useThemeContext()

    return (
        <div
            className={`flex min-h-screen transition-colors duration-500
        ${isDark ? 'bg-[#121212] text-gray-100' : 'bg-blue-50 text-gray-900'}`}
        >
            <Sidebar />

            <div className={`transition-all duration-300 min-h-screen w-full
        ${collapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                <header className="h-20 w-full fixed bg-uaa-blue dark:bg-[#0A2A4A]" />

                <main className="px-0 sm:px-6 py-6 pt-32 transition-colors duration-500">
                    <Toaster richColors position="bottom-right" />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}


