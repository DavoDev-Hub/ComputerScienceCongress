import { Link, NavLink } from "react-router-dom"
import { BadgeCheck, CalendarDays, QrCode, Trophy, User, Bell } from "lucide-react"

export default function NavbarUser() {
    const nombre = "Ana Martínez"

    const navItems = [
        { label: "Dashboard", to: "/user/dashboard", icon: <User className="w-4 h-4" /> },
        { label: "Actividades", to: "/user/actividades", icon: <BadgeCheck className="w-4 h-4" /> },
        { label: "Conferencias", to: "/user/conferencias", icon: <Trophy className="w-4 h-4" /> },
        { label: "Mi Horario", to: "/user/horario", icon: <CalendarDays className="w-4 h-4" /> },
        { label: "Mis QR", to: "/user/qr", icon: <QrCode className="w-4 h-4" /> },
    ]

    return (
        <header className="bg-white shadow-md border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/user/dashboard" className="flex items-center space-x-2">
                        <Trophy className="w-6 h-6 text-[#002E5D]" />
                        <div>
                            <h1 className="text-lg font-bold text-[#002E5D] leading-none">Semana de Congresos UAA</h1>
                            <p className="text-sm text-gray-600 -mt-1">Universidad Autónoma de Aguascalientes</p>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm">
                        ¡Hola, {nombre}!
                    </span>
                    <Bell className="w-5 h-5 text-blue-500 relative" />
                </div>
            </div>

            <nav className="bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 text-white">
                <ul className="flex px-4 max-w-7xl mx-auto">
                    {navItems.map(({ label, to, icon }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive ?
                                        "bg-white text-[#002E5D] rounded-t-xl" : "hover:bg-white/10"
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

