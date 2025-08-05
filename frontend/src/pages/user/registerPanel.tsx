import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Mail, Hash, BookOpen, Lock } from "lucide-react"
import { registerUser } from "@/services/userServices/apiAuth"
import { RegisterUserData } from "@/types/userTypes/authTypes"

export default function RegisterForm({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
    const [fullName, setFullName] = useState("")
    const [matricula, setMatricula] = useState("")
    const [email, setEmail] = useState("")
    const [semestre, setSemestre] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const UAA_DOMAIN = "@edu.uaa.mx"

    const handleRegister = async () => {
        setMessage(null)
        setIsLoading(true)

        // Validaciones rápidas
        if (!fullName || !matricula || !email || !semestre || !password) {
            setMessage({ type: "error", text: "Todos los campos son obligatorios." })
            setIsLoading(false)
            return
        }

        if (!email.endsWith(UAA_DOMAIN)) {
            setMessage({ type: "error", text: `El correo debe ser del dominio ${UAA_DOMAIN}` })
            setIsLoading(false)
            return
        }

        const semestreNum = Number(semestre)
        const matriculaNum = Number(matricula)

        if (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 12) {
            setMessage({ type: "error", text: "El semestre debe ser un número entre 1 y 12." })
            setIsLoading(false)
            return
        }

        if (isNaN(matriculaNum)) {
            setMessage({ type: "error", text: "La matrícula debe ser un número válido." })
            setIsLoading(false)
            return
        }

        const data: RegisterUserData = {
            nombre: fullName,
            correo: email,
            matricula: matriculaNum,
            semestre: semestreNum,
            password
        }

        try {
            await registerUser(data)
            setMessage({ type: "success", text: "¡Registro exitoso! Ya puedes iniciar sesión." })
            onRegisterSuccess()
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Error al registrar" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
                <Label htmlFor="full-name" className="text-[#002E5D]">Nombre Completo</Label>
                <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="full-name"
                        type="text"
                        placeholder="Ej. Juan Pérez García"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="matricula" className="text-[#002E5D]">Matrícula</Label>
                <div className="relative mt-1">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="matricula"
                        type="text"
                        placeholder="Ej. 123456"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value.replace(/\D/g, ""))}
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="register-email" className="text-[#002E5D]">Correo Institucional</Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="register-email"
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
                <Label htmlFor="semestre" className="text-[#002E5D]">Semestre</Label>
                <div className="relative mt-1">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="semestre"
                        type="number"
                        placeholder="Ej. 5"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        min="1"
                        max="12"
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password" className="text-[#002E5D]">Contraseña</Label>
                <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Ingresa una contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-3 py-2 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <Button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 hover:from-blue-500 hover:via-blue-700 hover:to-[#002E5D] text-white font-bold py-2 rounded-xl shadow-lg transition-all duration-300"
                disabled={isLoading}
            >
                {isLoading ? "Registrando..." : "Registrarse"}
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

