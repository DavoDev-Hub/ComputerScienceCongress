import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
    Users, QrCode, LogOut, Calendar, BookOpen, BarChart3,
    ChevronLeft, ChevronRight, Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip"
import logoUaa from "@/assets/logo_uaa.svg"
import "@/App.css"
import { useSidebar } from "@/context/SidebarContext"
import { logoutAdmin } from "@/services/adminServices/apiAuth"

function NavAdmin() {
    const { collapsed, toggleSidebar } = useSidebar()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [mobileOpen, setMobileOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await logoutAdmin()
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
            navigate("/admin/login")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (!mobile) setMobileOpen(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const navItems = [
        { label: "Dashboard", icon: <BarChart3 className="h-5 w-5" />, to: "/admin/dashboard", },
        { label: "Actividades", icon: <Calendar className="h-5 w-5" />, to: "/admin/actividades", },
        { label: "Conferencias", icon: <BookOpen className="h-5 w-5" />, to: "/admin/conferencias", },
        { label: "Estudiantes", icon: <Users className="h-5 w-5" />, to: "/admin/asistencias", },
        { label: "Asistencias", icon: <QrCode className="h-5 w-5" />, to: "/admin/registro", }
    ]

    const isActive = (path: string) => location.pathname === path

    const NavButton = ({ item }: { item: typeof navItems[0] }) => {
        const button = (
            <Button
                onClick={() => {
                    navigate(item.to)
                    if (isMobile) setMobileOpen(false)
                }}
                variant="ghost"
                className={`flex items-center w-full transition-all duration-200 mb-1 rounded-lg
          ${collapsed ? "justify-center px-2 py-3 mx-1" : "justify-start px-4 py-3 mx-2"}
          ${isActive(item.to)
                        ? "bg-uaa-blue text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700 hover:text-uaa-blue"
                    }`}
            >
                {collapsed ? (
                    item.icon
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3 text-sm font-medium">{item.label}</span>
                        </div>
                    </div>
                )}
            </Button>
        )

        return collapsed ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : button
    }

    const sidebarClass = `
    h-screen bg-white  border-gray-200 fixed transition-all duration-300 z-50
    ${isMobile
            ? `left-0 ${mobileOpen ? "w-72" : "w-0 overflow-hidden"}`
            : `${collapsed ? "w-20" : "w-72"} left-0`
        }
  `

    return (
        <>
            {isMobile && !mobileOpen && (
                <div className="w-full h-20 bg-uaa-blue flex items-center px-4 fixed top-0 left-0 z-40">
                    <Button
                        onClick={() => setMobileOpen(true)}
                        className="text-white hover:bg-uaa-blue/80"
                        variant="ghost"
                        size="icon"
                    >
                        <Menu />
                    </Button>

                    <div className="ml-auto bg-white h-8 w-8 rounded-md shadow-sm flex items-center justify-center">
                        <img src={logoUaa} alt="UAA" className="h-5 w-5" />
                    </div>
                </div>
            )}

            <aside className={sidebarClass}>
                <div className="flex items-center justify-between px-4 py-4 h-20  border-gray-200 bg-uaa-blue">
                    {!collapsed && !isMobile && (
                        <div className="flex items-center space-x-3">
                            <div className="bg-white h-10 w-10 rounded-lg shadow-sm flex items-center justify-center">
                                <img src={logoUaa} alt="UAA" className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">CS CONGRESO</h1>
                                <p className="text-xs text-blue-100">Panel Administrativo</p>
                            </div>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (isMobile) setMobileOpen(false)
                            else toggleSidebar()
                        }}
                        className="text-white hover:bg-white/20 p-2 rounded-md"
                    >
                        {isMobile ? <ChevronLeft /> : collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>
                </div>

                <div className={`flex flex-col items-center border-b border-gray-200 bg-gray-50 ${collapsed ? "py-4" : "py-6"}`}>
                    <Avatar className={`border-4 border-white shadow-lg ${collapsed ? "h-12 w-12" : "h-16 w-16"}`}>
                        <AvatarFallback className="bg-uaa-blue text-white text-lg font-bold">AD</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="mt-3 text-center">
                            <p className="text-sm font-semibold text-gray-800">Administrador</p>
                            <p className="text-xs text-gray-500">admin@uaa.mx</p>
                            <Badge variant="outline" className="mt-2 text-xs border-green-200 text-green-700 bg-green-50">
                                En línea
                            </Badge>
                        </div>
                    )}
                </div>

                <nav className="flex flex-col mt-4 flex-1 overflow-y-auto">
                    <div className={`mb-2 ${collapsed ? "px-1" : "px-2"}`}>
                        {!collapsed && (
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                Navegación
                            </p>
                        )}
                        {navItems.map((item) => (
                            <NavButton key={item.label} item={item} />
                        ))}
                    </div>
                </nav>

                {/* Footer */}
                <div className={`mt-auto border-t border-gray-200 bg-gray-50 ${collapsed ? "p-2" : "p-4"}`}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`
                    flex items-center w-full hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors
                    ${collapsed ? "justify-center px-2 py-3" : "justify-start px-3 py-2"}
                  `}
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    {!collapsed && <span className="ml-2 text-sm">Cerrar sesión</span>}
                                </Button>
                            </TooltipTrigger>
                            {collapsed && <TooltipContent side="right">Cerrar sesión</TooltipContent>}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </aside>
        </>
    )
}

export default NavAdmin

