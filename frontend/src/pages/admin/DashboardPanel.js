import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getDashboardData } from "@/services/adminServices/apiDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, QrCode, BookOpen, Gamepad2, Clock, CheckCircle, BarChart3, } from "lucide-react";
function DashboardPanel() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [data, setData] = useState(null);
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getDashboardData();
            setData(response);
        };
        fetchData();
    }, []);
    const formatTime = (date) => {
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };
    const formatDate = (date) => {
        return date.toLocaleDateString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    if (!data)
        return _jsx("p", { className: "p-6", children: "Cargando datos del dashboard..." });
    return (_jsxs("div", { className: "min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto", children: [_jsx("div", { className: "flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0", children: _jsxs("div", { className: "space-y-1", children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "Dashboard Administrativo" }), _jsxs("p", { className: "text-sm sm:text-base text-gray-600", children: [formatDate(currentTime), " \u2022 ", formatTime(currentTime)] })] }) }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-4 sm:p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-600", children: "Total Estudiantes" }), _jsx("p", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: data.totalEstudiantes })] }), _jsx("div", { className: "p-2 bg-blue-100 rounded-full", children: _jsx(Users, { className: "h-6 w-6 text-uaa-blue" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4 sm:p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-600", children: "Total Actividades" }), _jsx("p", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: data.totalActividades })] }), _jsx("div", { className: "p-2 bg-orange-100 rounded-full", children: _jsx(Calendar, { className: "h-6 w-6 text-uaa-orange" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4 sm:p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-600", children: "Asistencias Hoy" }), _jsx("p", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: data.asistenciasHoy })] }), _jsx("div", { className: "p-2 bg-green-100 rounded-full", children: _jsx(QrCode, { className: "h-6 w-6 text-green-600" }) })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4 sm:p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-600", children: "QR Escaneados Hoy" }), _jsx("p", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: data.qrEscaneadosHoy })] }), _jsx("div", { className: "p-2 bg-purple-100 rounded-full", children: _jsx(BarChart3, { className: "h-6 w-6 text-purple-600" }) })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2", children: [_jsx(CardHeader, { children: _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: "Actividades Activas" }), _jsx(CardDescription, { children: "Estado actual de las actividades programadas" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [data.actividadesActivas.length === 0 && (_jsx("p", { className: "text-gray-500 text-sm", children: "No hay actividades activas por el momento." })), data.actividadesActivas.map((actividad) => (_jsx("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `p-2 rounded-full ${actividad.tipo === "academico" ? "bg-blue-100" : "bg-pink-100"}`, children: actividad.tipo === "academico" ? (_jsx(BookOpen, { className: "h-5 w-5 text-uaa-blue" })) : (_jsx(Gamepad2, { className: "h-5 w-5 text-uaa-pink" })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h4", { className: "font-medium text-gray-900 truncate", children: actividad.nombre }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-gray-500 mt-1", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), actividad.hora] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Users, { className: "h-3 w-3 mr-1" }), actividad.asistentes, "/", actividad.cupo] })] }), _jsx(Progress, { value: (actividad.asistentes / actividad.cupo) * 100, className: "h-2 mt-2" })] }), _jsx(Badge, { variant: "default", className: "bg-green-600", children: "En curso" })] }) }, actividad.id)))] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: "Asistencias Recientes" }), _jsx(CardDescription, { children: "\u00DAltimos registros de QR" })] }), _jsx(CardContent, { className: "space-y-4", children: data.recentAttendances.map((attendance) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 border rounded-lg", children: [_jsx(Avatar, { className: "h-10 w-10", children: _jsx(AvatarFallback, { className: "bg-uaa-blue text-white text-sm", children: attendance.estudiante
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("") }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "font-medium text-gray-900 text-sm truncate", children: attendance.estudiante }), _jsx("p", { className: "text-xs text-gray-500", children: attendance.matricula }), _jsx("p", { className: "text-xs text-gray-600 font-medium truncate", children: attendance.actividad })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-xs text-gray-500", children: new Date(attendance.tiempo).toLocaleTimeString("es-MX") }), _jsx("div", { className: "flex items-center justify-end mt-1", children: _jsx(CheckCircle, { className: "h-3 w-3 text-green-600" }) })] })] }, attendance.id))) })] })] })] }));
}
export default DashboardPanel;
