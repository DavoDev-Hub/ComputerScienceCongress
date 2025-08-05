import { Outlet } from "react-router-dom"
import UserNavbar from "@/components/nav/navUser"

export default function StudentLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <UserNavbar />

            <main className="flex-1 px-4 py-6 md:px-10 md:py-8 bg-blue-50">
                <Outlet />
            </main>
        </div>
    )
}

