import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import logoUaa from "@/assets/logo_uaa.svg"

export default function WelcomePage({ onEnter }: { onEnter: () => void }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
            <header className="text-center mb-10">
                <div className="flex items-center justify-center space-x-4">
                    <img src={logoUaa} alt="Logo UAA" className="w-16 h-16" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#002E5D]">Universidad Autónoma</h1>
                        <h2 className="text-xl md:text-2xl text-blue-700">de Aguascalientes</h2>
                    </div>
                </div>
            </header>

            <main className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-[#002E5D] to-blue-700 bg-clip-text text-transparent mb-6">
                    SEMANA DE CONGRESOS
                </h1>
                <p className="text-center text-lg text-gray-700 max-w-xl mx-auto mb-10">
                    Participa en actividades académicas y extracurriculares. Inscríbete, genera tu QR y forma parte del evento más importante del semestre.
                </p>

                <div className="flex justify-center">
                    <Button
                        size="lg"
                        onClick={onEnter}
                        className="bg-gradient-to-r from-[#002E5D] to-blue-600 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
                    >
                        ¡Comenzar Mi Aventura!
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </main>
        </div>
    )
}

