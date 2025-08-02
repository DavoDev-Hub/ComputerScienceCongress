import { useState } from "react"
import { loginAdmin } from "@/services/adminServices/apiAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import logoUaa from "@/assets/logo_uaa.svg"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({ email: "", password: "" })
        setIsLoading(true)

        const newErrors = { email: "", password: "" }

        if (!email) {
            newErrors.email = "El correo electrónico es requerido"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Ingrese un correo electrónico válido"
        }

        if (!password) {
            newErrors.password = "La contraseña es requerida"
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }

        try {
            const data = await loginAdmin(email, password)
            console.log("Login exitoso:", data)

            window.location.href = "/admin/dashboard"
        } catch (error: any) {
            setErrors({ email: "", password: error.message || "Error desconocido" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 relative">
                            <img src={logoUaa} alt="Logo Universidad" className="object-contain" />
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Iniciar sesión como administrador</h1>
                    <p className="text-slate-600 text-sm">Acceso al panel de administración universitario</p>
                </div>

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-xl text-center text-slate-700">Credenciales de acceso</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@uaa.edu.mx"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`h-12 border-2 transition-colors ${errors.email ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                                        }`}
                                    disabled={isLoading}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-700 font-medium">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`h-12 border-2 transition-colors ${errors.password ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                                        }`}
                                    disabled={isLoading}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold text-base shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Iniciando sesión...
                                    </div>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-slate-500 text-sm">Sistema de Administración Universitaria</p>
                    <p className="text-slate-400 text-xs mt-1">© 2025 - Acceso restringido a personal autorizado</p>
                </div>
            </div>
        </div>
    )
}

