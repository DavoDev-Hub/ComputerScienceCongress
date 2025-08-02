import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import LoginUser from "@/pages/user/loginPanel"
// import RegisterForm from "./register-form"

function AuthPage() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)

    // const handleAuthSuccess = () => {
    //     setTimeout(() => {
    //         onAuthSuccess()
    //     }, 500)
    // }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Fondo animado */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#002E5D]/25 to-blue-400/15 rounded-full animate-pulse blur-3xl"></div>
                <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-blue-300/10 rounded-full animate-bounce blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-700/30 to-blue-500/20 rounded-full animate-pulse blur-2xl"></div>
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/15 to-blue-300/10 rounded-full animate-float blur-xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-blue-700/20 to-blue-500/15 rounded-full animate-float blur-xl" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/25 to-blue-200/15 rounded-full animate-bounce blur-lg" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-600/30 to-blue-400/20 rounded-full opacity-30 animate-pulse blur-lg" style={{ animationDelay: "2s" }}></div>
            </div>

            <main className="relative z-10 flex-grow flex items-center justify-center p-4 md:p-8">
                <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#002E5D] via-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <GraduationCap className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#002E5D] to-blue-700 bg-clip-text text-transparent mb-2">
                                Acceso de Alumnos
                            </h2>
                            <p className="text-gray-600">
                                {isRegisterMode ? "Crea tu cuenta para empezar" : "Inicia sesión para gestionar tus actividades"}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {isRegisterMode ? (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <LoginUser />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-6 text-center">
                            <Button
                                variant="link"
                                onClick={() => setIsRegisterMode(!isRegisterMode)}
                                className="text-[#002E5D] hover:text-blue-700 transition-colors"
                            >
                                {isRegisterMode ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default AuthPage
