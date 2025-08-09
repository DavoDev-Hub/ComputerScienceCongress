import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
    Users, QrCode, LogOut, Calendar, BookOpen, BarChart3,
    ChevronLeft, ChevronRight, Menu, Moon, Sun
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import logoUaa from "@/assets/logo_uaa.svg"
import "@/App.css"
import { useSidebar } from "@/context/SidebarContext"
import { logoutAdmin } from "@/services/adminServices/apiAuth"
import { useThemeContext } from "@/context/ThemeContext"

function NavAdmin() {
    const { collapsed, toggleSidebar } = useSidebar()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [mobileOpen, setMobileOpen] = useState(false)

    const { isDark, toggleTheme } = useThemeContext()

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
        { label: "Dashboard", icon: <BarChart3 className="h-5 w-5" />, to: "/admin/dashboard" },
        { label: "Actividades", icon: <Calendar className="h-5 w-5" />, to: "/admin/actividades" },
        { label: "Conferencias", icon: <BookOpen className="h-5 w-5" />, to: "/admin/conferencias" },
        { label: "Estudiantes", icon: <Users className="h-5 w-5" />, to: "/admin/asistencias" },
        { label: "Asistencias", icon: <QrCode className="h-5 w-5" />, to: "/admin/registro" }
    ]

    const isActive = (path: string) => location.pathname === path

    const NavButton = ({ item }: { item: typeof navItems[0] }) => {
        const active = isActive(item.to)
        const button = (
            <Button
                onClick={() => {
                    navigate(item.to)
                    if (isMobile) setMobileOpen(false)
                }}
                variant="ghost"
                className={`group flex items-center w-full transition-all duration-150 mb-1 rounded-lg
          ${collapsed ? "justify-center px-2 py-3 mx-1" : "justify-start px-3 py-2.5 mx-2"}
          ${active
                        ? "bg-uaa-blue/10 text-uaa-blue border border-uaa-blue/20 dark:bg-uaa-blue/20 dark:text-white dark:border-uaa-blue/30"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
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
                        {active && <span className="h-2 w-2 rounded-full bg-uaa-blue group-hover:scale-110" />}
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
    h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
    fixed transition-all duration-300 z-50
    ${isMobile
            ? `left-0 ${mobileOpen ? "w-72" : "w-0 overflow-hidden"}`
            : `${collapsed ? "w-20" : "w-72"} left-0`
        }
  `

    return (
        <>
            {/* Topbar móvil (solo menú + logo) */}
            {isMobile && !mobileOpen && (
                <div className="w-full h-16 bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-800 flex items-center px-3 fixed top-0 left-0 z-40">
                    <Button
                        onClick={() => setMobileOpen(true)}
                        className="hover:bg-black/5 dark:hover:bg-white/10"
                        variant="ghost"
                        size="icon"
                    >
                        <Menu />
                    </Button>

                    <div className="ml-auto bg-white dark:bg-gray-800 h-8 w-8 rounded-md shadow-sm flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <img src={logoUaa} alt="UAA" className="h-5 w-5" />
                    </div>
                </div>
            )}

            <aside className={sidebarClass}>
                {/* Header del sidebar (limpio, blanco) */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    {!collapsed && !isMobile && (
                        <div className="flex items-center space-x-3">
                            <div className="bg-white dark:bg-gray-800 h-10 w-10 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                <img src={logoUaa} alt="UAA" className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">CS CONGRESO</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Panel Administrativo</p>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (isMobile) setMobileOpen(false)
                            else toggleSidebar()
                        }}
                        className="hover:bg-black/5 dark:hover:bg-white/10"
                        title={isMobile ? "Cerrar menú" : collapsed ? "Expandir" : "Colapsar"}
                    >
                        {isMobile ? <ChevronLeft /> : collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>
                </div>

                {/* Perfil */}
                <div className={`flex flex-col items-center border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 ${collapsed ? "py-4" : "py-6"}`}>
                    <Avatar className={`border-4 border-white dark:border-gray-800 shadow ${collapsed ? "h-12 w-12" : "h-16 w-16"}`}>
                        <AvatarFallback className="bg-uaa-blue text-white text-lg font-bold">AD</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="mt-3 text-center">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Administrador</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">admin@uaa.mx</p>
                            <Badge variant="outline" className="mt-2 text-xs border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-300 dark:bg-green-900/30">
                                En línea
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Navegación */}
                <nav className="flex flex-col mt-3 flex-1 overflow-y-auto">
                    <div className={`mb-2 ${collapsed ? "px-1" : "px-2"}`}>
                        {!collapsed && (
                            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">
                                Navegación
                            </p>
                        )}
                        {navItems.map((item) => (
                            <NavButton key={item.label} item={item} />
                        ))}
                    </div>
                </nav>

                {/* Footer: barra de tema + cerrar sesión */}
                <div className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                    {/* Barra de cambio de tema (bonita) */}
                    <div className={`px-3 pt-3`}>
                        <Button
                            variant="ghost"
                            size={collapsed ? "icon" : "sm"}
                            onClick={toggleTheme}
                            className={`w-full flex items-center ${collapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-2"} 
                rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors`}
                            title={isDark ? "Modo día" : "Modo oscuro"}
                            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        >
                            {!collapsed && (
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Tema</span>
                            )}
                            <div className={`flex items-center gap-2 ${collapsed ? "" : "ml-auto"}`}>
                                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </div>
                        </Button>
                    </div>

                    {/* Botón de cerrar sesión */}
                    <div className={`${collapsed ? "p-2" : "p-3"}`}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`
                      flex items-center w-full hover:bg-red-50 text-red-600 hover:text-red-700 
                      dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 rounded-lg transition-colors
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
                </div>
            </aside>
        </>
    )
}

export default NavAdmin

