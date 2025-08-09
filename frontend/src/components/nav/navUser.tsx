import { Link, NavLink, useNavigate } from "react-router-dom"
import {
    BadgeCheck,
    CalendarDays,
    QrCode,
    Trophy,
    User,
    Menu,
    Moon,
    Sun,
    LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import logoUAA from "@/assets/logo_uaa.svg"
import { useThemeContext } from "@/context/ThemeContext"

function NavbarUser() {
    const nombre = "Ana Martínez"
    const { isDark, toggleTheme } = useThemeContext()
    const navigate = useNavigate()

    const navItems = [
        { label: "Dashboard", to: "/user/dashboard", icon: <User className="w-4 h-4" /> },
        { label: "Actividades", to: "/user/actividades", icon: <BadgeCheck className="w-4 h-4" /> },
        { label: "Conferencias", to: "/user/conferencias", icon: <Trophy className="w-4 h-4" /> },
        { label: "Mi Horario", to: "/user/horario", icon: <CalendarDays className="w-4 h-4" /> },
        { label: "Mis QR", to: "/user/qr", icon: <QrCode className="w-4 h-4" /> },
    ]

    const handleLogout = () => {
        localStorage.removeItem("token_alumno")
        navigate("/user/auth")
    }

    return (
        <header className="bg-gradient-to-r from-[#002E5D]/90 via-blue-700/90 to-blue-500/90 shadow-md border-b border-blue-800 sticky top-0 z-50 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="w-6 h-6 text-white" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-[250px] sm:w-[300px] bg-gradient-to-b from-[#002E5D] to-blue-700 text-white">
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-blue-800 flex items-center space-x-2">
                                    <img src={logoUAA} alt="Logo UAA" className="w-8 h-8" />
                                    <div>
                                        <h1 className="text-xl font-bold leading-none text-white drop-shadow-md">Semana de Congresos UAA</h1>
                                        <p className="text-sm text-blue-100 -mt-1 drop-shadow-sm">Universidad Autónoma de Aguascalientes</p>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4">
                                    <SidebarMenu>
                                        {navItems.map(({ label, to, icon }) => (
                                            <SidebarMenuItem key={to}>
                                                <NavLink
                                                    to={to}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 px-4 py-2.5 text-base font-medium rounded-lg transition-colors duration-200
                                                        ${isActive
                                                            ? "bg-white text-[#002E5D] shadow-sm"
                                                            : "text-blue-100 hover:bg-blue-600 hover:text-white"
                                                        }`
                                                    }
                                                >
                                                    {icon}
                                                    <span>{label}</span>
                                                </NavLink>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </div>
                                <div className="p-4 border-t border-blue-800 flex items-center justify-between">
                                    <span className="text-blue-100 text-sm">¡Hola, {nombre}!</span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleTheme}
                                            className="text-blue-100 hover:text-yellow-300"
                                        >
                                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={handleLogout}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo y título */}
                <div className="flex items-center space-x-4">
                    <Link to="/user/dashboard" className="flex items-center space-x-2">
                        <img src={logoUAA} alt="Logo UAA" className="w-10 h-10" />
                        <div>
                            <h1 className="text-lg font-bold text-white leading-none drop-shadow-md">Semana de Congresos UAA</h1>
                            <p className="text-sm text-blue-100 -mt-1 hidden sm:block drop-shadow-sm">Universidad Autónoma de Aguascalientes</p>
                        </div>
                    </Link>
                </div>

                {/* Controles */}
                <div className="flex items-center space-x-4">
                    <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm shadow-sm hidden sm:block">
                        ¡Hola, {nombre}!
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="text-blue-100 hover:text-yellow-300"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="sr-only">Cambiar tema</span>
                    </Button>
                    {/* Botón de logout en desktop */}
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 text-white hidden md:block">
                <ul className="flex justify-center px-4 max-w-7xl mx-auto">
                    {navItems.map(({ label, to, icon }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300 relative
                                    ${isActive
                                        ? "bg-white text-[#002E5D] rounded-t-xl shadow-inner-top"
                                        : "hover:bg-white/10 text-white"
                                    }`
                                }
                            >
                                {icon}
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default NavbarUser

