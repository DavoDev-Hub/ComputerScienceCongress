import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"
import { loginUser } from "@/services/userServices/apiAuth"

function LoginUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const UAA_DOMAIN = "@edu.uaa.mx"

    const handleLogin = async () => {
        setMessage(null)
        setIsLoading(true)

        if (!email.endsWith(UAA_DOMAIN)) {
            setMessage({ type: "error", text: `El correo debe ser del dominio ${UAA_DOMAIN}` })
            setIsLoading(false)
            return
        }

        try {
            await loginUser(email, password)
            setMessage({ type: "success", text: "¡Inicio de sesión exitoso!" })

            navigate("/user/dashboard")
        } catch (error: any) {
            setMessage({ type: "error", text: error.message })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
                <Label htmlFor="login-email" className="text-[#002E5D]">
                    Correo Institucional
                </Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="login-email"
                        type="email"
                        placeholder={`tu.nombre${UAA_DOMAIN}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="login-password" className="text-[#002E5D]">
                    Contraseña
                </Label>
                <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="login-password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 hover:from-blue-500 hover:via-blue-700 hover:to-[#002E5D] text-white font-bold py-2 rounded-xl shadow-lg transition-all duration-300"
                disabled={isLoading}
            >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            {message && (
                <div
                    className={`mt-4 p-3 rounded-xl text-sm ${message.type === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {message.text}
                </div>
            )}
        </form>
    )
}

export default LoginUser

