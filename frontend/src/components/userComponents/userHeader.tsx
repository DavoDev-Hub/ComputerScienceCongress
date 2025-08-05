import { LogOut } from "lucide-react"
import logoUaa from "@/assets/UaaXL.png"
import { Button } from "@/components/ui/button"

interface Props {
    nombre: string
    onLogout: () => void
}

export default function userHeader({ nombre, onLogout }: Props) {
    return (
        <header className="w-full bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src={logoUaa} alt="UAA Logo" className="h-10 w-auto" />
                    <span className="text-lg font-bold text-[#002E5D]">Semana de Congresos</span>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-sm text-[#002E5D] font-medium">👋 Hola, {nombre}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onLogout}
                        className="hover:text-red-500"
                        aria-label="Cerrar sesión"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}

