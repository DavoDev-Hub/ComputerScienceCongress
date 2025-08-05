import { Button } from "@/components/ui/button"

import {
    Home,
    Calendar,
    QrCode,
    BookOpen,
    Gamepad2,
} from "lucide-react"

interface Props {
    currentView: string
    setCurrentView: (view: string) => void
}

export default function userNavbar({ currentView, setCurrentView }: Props) {
    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
        { id: "activities", label: "Actividades", icon: <Gamepad2 className="w-4 h-4" /> },
        { id: "conferences", label: "Conferencias", icon: <BookOpen className="w-4 h-4" /> },
        { id: "calendar", label: "Mi Horario", icon: <Calendar className="w-4 h-4" /> },
        { id: "qr", label: "Mis QR", icon: <QrCode className="w-4 h-4" /> },
    ]

    return (
        <nav className="relative z-10 bg-white/60 backdrop-blur-xl border-b border-white/20">
            <div className="container mx-auto px-4">
                <div className="flex space-x-1 py-2">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            variant={currentView === tab.id ? "default" : "ghost"}
                            onClick={() => setCurrentView(tab.id)}
                            className={`flex items-center space-x-2 rounded-2xl ${currentView === tab.id
                                ? "bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 text-white shadow-xl"
                                : "hover:bg-white/80 text-[#002E5D]"
                                }`}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

