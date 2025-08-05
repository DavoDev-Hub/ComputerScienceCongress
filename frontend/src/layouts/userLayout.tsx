import { useState } from "react"
import StudentNavbar from "@/components/nav/navUser"
import UserHeader from "@/components/userComponents/userHeader"
import { Toaster } from "@/components/ui/sonner"

interface userLayoutProps {
    nombre: string
    children: React.ReactNode
    onLogout: () => void
}

export default function userLayout({ nombre, children, onLogout }: userLayoutProps) {
    const [currentView, setCurrentView] = useState("inicio")

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <UserHeader nombre={nombre} onLogout={onLogout} />

            <div className="flex flex-grow">
                <StudentNavbar currentView={currentView} setCurrentView={setCurrentView} />

                <main className="flex-grow p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

            <Toaster />
        </div>
    )
}

