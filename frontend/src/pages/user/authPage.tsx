import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import LoginUser from "@/pages/user/loginPanel"
import RegisterForm from "@/pages/user/registerPanel"

function AuthPage() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)

    const handleRegisterSuccess = () => {
        setIsRegisterMode(false)
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

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
                                    <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
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
                                {isRegisterMode
                                    ? "¿Ya tienes cuenta? Inicia sesión"
                                    : "¿No tienes cuenta? Regístrate aquí"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default AuthPage

