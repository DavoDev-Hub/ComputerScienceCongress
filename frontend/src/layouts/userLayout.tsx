import { Outlet } from "react-router-dom"
import UserNavbar from "@/components/nav/navUser"
import { useThemeContext } from "@/context/ThemeContext"

export default function StudentLayout() {
    const { isDark } = useThemeContext()

    return (
        <div
            className={`flex flex-col min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
                }`}
        >
            <UserNavbar />
            <main className="flex-1 px-4 py-6 md:px-10 md:py-8 transition-colors duration-500 bg-blue-50 text-gray-900 dark:bg-black dark:text-white">
                <Outlet />
            </main>
        </div>
    )
}

