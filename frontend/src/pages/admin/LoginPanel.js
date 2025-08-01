import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { loginAdmin } from "@/services/adminServices/apiAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logoUaa from "@/assets/logo_uaa.svg";
export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ email: "", password: "" });
        setIsLoading(true);
        const newErrors = { email: "", password: "" };
        if (!email) {
            newErrors.email = "El correo electrónico es requerido";
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Ingrese un correo electrónico válido";
        }
        if (!password) {
            newErrors.password = "La contraseña es requerida";
        }
        else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }
        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
        try {
            const data = await loginAdmin(email, password);
            console.log("Login exitoso:", data);
            window.location.href = "/admin/dashboard";
        }
        catch (error) {
            setErrors({ email: "", password: error.message || "Error desconocido" });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 relative", children: _jsx("img", { src: logoUaa, alt: "Logo Universidad", className: "object-contain" }) }) }), _jsx("h1", { className: "text-2xl md:text-3xl font-bold text-slate-800 mb-2", children: "Iniciar sesi\u00F3n como administrador" }), _jsx("p", { className: "text-slate-600 text-sm", children: "Acceso al panel de administraci\u00F3n universitario" })] }), _jsxs(Card, { className: "shadow-xl border-0 bg-white/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "space-y-1 pb-4", children: _jsx(CardTitle, { className: "text-xl text-center text-slate-700", children: "Credenciales de acceso" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-slate-700 font-medium", children: "Correo electr\u00F3nico" }), _jsx(Input, { id: "email", type: "email", placeholder: "admin@uaa.edu.mx", value: email, onChange: (e) => setEmail(e.target.value), className: `h-12 border-2 transition-colors ${errors.email ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}`, disabled: isLoading }), errors.email && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-slate-700 font-medium", children: "Contrase\u00F1a" }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), className: `h-12 border-2 transition-colors ${errors.password ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}`, disabled: isLoading }), errors.password && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.password })] }), _jsx(Button, { type: "submit", className: "w-full h-12 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold text-base shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none", disabled: isLoading, children: isLoading ? (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Iniciando sesi\u00F3n..."] })) : ("Iniciar sesión") })] }) })] }), _jsxs("div", { className: "text-center mt-8", children: [_jsx("p", { className: "text-slate-500 text-sm", children: "Sistema de Administraci\u00F3n Universitaria" }), _jsx("p", { className: "text-slate-400 text-xs mt-1", children: "\u00A9 2025 - Acceso restringido a personal autorizado" })] })] }) }));
}
