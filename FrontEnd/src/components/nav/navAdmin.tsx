import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Users, QrCode, LogOut, Menu } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import logoUaa from "@/assets/logo_uaa.svg"
import "@/App.css"

export function NavAdmin() {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    const navItems = [
        { label: "Actividades", icon: <Settings className="h-5 w-5" />, to: "/admin/actividades" },
        { label: "Conferencias", icon: <Settings className="h-5 w-5" />, to: "/admin/conferencias" },
        { label: "Estudiantes", icon: <Users className="h-5 w-5" />, to: "/admin/asistencias" },
        { label: "Asistencias", icon: <QrCode className="h-5 w-5" />, to: "/admin/registro" },
    ]

    return (
        <aside
            className={`h-screen bg-white border-r border-gray-200 fixed top-0 left-0 transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <img src={logoUaa} alt="UAA" className="h-8 w-auto" />
                    {!collapsed && <h1 className="text-lg font-bold text-uaa-blue">LITC CONGRESO</h1>}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex flex-col items-center py-4 border-b border-gray-200">
                <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-uaa-blue text-white">AD</AvatarFallback>
                </Avatar>
                {!collapsed && <p className="mt-2 text-sm font-medium text-gray-800">Admin</p>}
            </div>

            <nav className="flex flex-col mt-4">
                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        onClick={() => navigate(item.to)}
                        variant="ghost"
                        className="flex items-center justify-start px-4 py-2 hover:bg-uaa-blue hover:text-white w-full rounded-none"
                    >
                        {item.icon}
                        {!collapsed && <span className="ml-3 text-sm">{item.label}</span>}
                    </Button>
                ))}
            </nav>

            <div className="mt-auto px-4 py-3 border-t border-gray-200">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center w-full justify-start hover:bg-red-100 text-red-600"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    {!collapsed && "Cerrar sesión"}
                </Button>
            </div>
        </aside>
    )
}

