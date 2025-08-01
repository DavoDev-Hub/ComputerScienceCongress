import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoUaa from "@/assets/logo_uaa.svg";
export default function WelcomePage({ onEnter }) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden", children: [_jsx("header", { className: "text-center mb-10", children: _jsxs("div", { className: "flex items-center justify-center space-x-4", children: [_jsx("img", { src: logoUaa, alt: "Logo UAA", className: "w-16 h-16" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#002E5D]", children: "Universidad Aut\u00F3noma" }), _jsx("h2", { className: "text-xl md:text-2xl text-blue-700", children: "de Aguascalientes" })] })] }) }), _jsxs("main", { className: `transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`, children: [_jsx("h1", { className: "text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-[#002E5D] to-blue-700 bg-clip-text text-transparent mb-6", children: "SEMANA DE CONGRESOS" }), _jsx("p", { className: "text-center text-lg text-gray-700 max-w-xl mx-auto mb-10", children: "Participa en actividades acad\u00E9micas y extracurriculares. Inscr\u00EDbete, genera tu QR y forma parte del evento m\u00E1s importante del semestre." }), _jsx("div", { className: "flex justify-center", children: _jsxs(Button, { size: "lg", onClick: onEnter, className: "bg-gradient-to-r from-[#002E5D] to-blue-600 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform", children: ["\u00A1Comenzar Mi Aventura!", _jsx(ArrowRight, { className: "ml-2 w-5 h-5" })] }) })] })] }));
}
