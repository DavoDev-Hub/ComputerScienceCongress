import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Trophy, Sparkles, BookOpen, Microscope } from "lucide-react"
import Footer from "@/components/Footer"
import logoUaaXL from "@/assets/UaaXL.png"
import { useNavigate } from "react-router-dom"

export default function WelcomePage() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentFeature, setCurrentFeature] = useState(0)
    const navigate = useNavigate()

    const handleGoLogin = () => {
        navigate("/user/auth")
    }

    useEffect(() => {
        setIsVisible(true)
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % 4)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: BookOpen,
            title: "Conferencias Magistrales",
            description: "Expertos internacionales compartiendo conocimiento",
        },
        {
            icon: Microscope,
            title: "Investigación Innovadora",
            description: "Descubre los últimos avances científicos",
        },
        {
            icon: Users,
            title: "Networking Estudiantil",
            description: "Conecta con estudiantes de toda la universidad",
        },
        {
            icon: Trophy,
            title: "Competencias y Premios",
            description: "Participa en concursos y gana reconocimientos",
        },
    ]

    return (
        <div className="flex flex-col flex-grow relative overflow-hidden">
            {/* Fondo Dinámico Inspirado en el Logo  */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
                {/* Formas Orgánicas Grandes */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#002E5D]/25 to-blue-400/15 rounded-full animate-pulse blur-3xl"></div>
                <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-blue-300/10 rounded-full animate-bounce blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-700/30 to-blue-500/20 rounded-full animate-pulse blur-2xl"></div>

                {/* Formas Orgánicas Medianas */}
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/15 to-blue-300/10 rounded-full animate-float blur-xl"></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-blue-700/20 to-blue-500/15 rounded-full animate-float blur-xl"
                    style={{ animationDelay: "1s" }}
                ></div>

                {/* Elementos Flotantes Pequeños */}
                <div
                    className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/25 to-blue-200/15 rounded-full animate-bounce blur-lg"
                    style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-600/30 to-blue-400/20 rounded-full opacity-30 animate-pulse blur-lg"
                    style={{ animationDelay: "2s" }}
                ></div>

                {/* Ondas de Fondo */}

            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 flex-grow flex flex-col">
                {/* Header con Logo */}
                <header className="pt-8 pb-2 px-8">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-center">
                            <img src={logoUaaXL} alt="UAA Logo" className="w-80 h-auto md:w-96 lg:w-96 mx-auto object-contain" />
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-8">
                    <div className="max-w-6xl mx-auto text-center">
                        <div
                            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-xl mb-6">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    <span className="text-[#002E5D] font-semibold">15-17 Marzo 2024</span>
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                </div>

                                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-[#002E5D] to-blue-700 bg-clip-text text-transparent">
                                        SEMANA DE
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-700 to-[#002E5D] bg-clip-text text-transparent">
                                        CONGRESOS
                                    </span>
                                </h1>

                                <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
                                    El evento académico más importante del año. Tres días de{" "}
                                    <span className="font-bold text-blue-700">conocimiento</span>,{" "}
                                    <span className="font-bold text-[#002E5D]">innovación</span> y{" "}
                                    <span className="font-bold text-blue-500">diversión</span> que transformarán tu experiencia
                                    universitaria.
                                </p>

                                <Button
                                    onClick={handleGoLogin}
                                    size="lg"
                                    className="bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 hover:from-blue-500 hover:via-blue-700 hover:to-[#002E5D] text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group animate-gradient"
                                >
                                    <span>¡Comenzar Mi Aventura!</span>
                                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>

                            {/* Tarjetas de Características Rotativas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {features.map((feature, index) => (
                                    <Card
                                        key={index}
                                        className={`bg-white/70 backdrop-blur-md border-white/20 shadow-xl transition-all duration-500 hover:scale-105 ${currentFeature === index ? "ring-4 ring-blue-500/50 shadow-2xl" : ""
                                            }`}
                                    >
                                        <CardContent className="p-6 text-center">
                                            <div
                                                className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${currentFeature === index
                                                    ? "bg-gradient-to-br from-[#002E5D] to-blue-700 scale-110"
                                                    : "bg-gradient-to-br from-gray-400 to-gray-600"
                                                    }`}
                                            >
                                                <feature.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="font-bold text-[#002E5D] mb-2">{feature.title}</h3>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Estadísticas Impresionantes */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div className="text-center">
                                    <div className="text-5xl font-black bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                                        50+
                                    </div>
                                    <p className="text-gray-700 font-semibold">Actividades Disponibles</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-black bg-gradient-to-r from-[#002E5D] to-blue-500 bg-clip-text text-transparent mb-2">
                                        3000+
                                    </div>
                                    <p className="text-gray-700 font-semibold">Estudiantes Participando</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-black bg-gradient-to-r from-blue-700 to-[#002E5D] bg-clip-text text-transparent mb-2">
                                        100+
                                    </div>
                                    <p className="text-gray-700 font-semibold">Expertos Internacionales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>

            {/* Partículas Flotantes */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-30 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
            <Footer />
        </div>
    )
}

