import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, QrCode } from "lucide-react";
import { getRecentAttendance } from "@/services/adminServices/apiAsistencia";
import QRScanner from "@/components/adminComponents/qr/QrScanner";
function RegistroAsistencias() {
    const [scannerActive, setScannerActive] = useState(false);
    const [recentAttendances, setRecentAttendances] = useState([]);
    const fetchData = async () => {
        try {
            const data = await getRecentAttendance();
            setRecentAttendances(data);
        }
        catch (error) {
            console.error("Error al obtener asistencias recientes:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };
    return (_jsxs("div", { className: "min-h-screen overflow-x-hidden space-y-4 sm:space-y-6 px-4 sm:px-6 mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "Control de Asistencias" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Escanea c\u00F3digos QR y gestiona asistencias en tiempo real" })] }), _jsx("div", { className: "flex items-center", children: _jsxs(Button, { className: `w-full sm:w-auto ${scannerActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`, onClick: () => setScannerActive(!scannerActive), children: [_jsx(QrCode, { className: "h-4 w-4 mr-2" }), _jsx("span", { className: "hidden sm:inline", children: scannerActive ? "Detener Scanner" : "Activar Scanner QR" }), _jsx("span", { className: "sm:hidden", children: scannerActive ? "Detener" : "Activar QR" })] }) })] }), scannerActive && (_jsx("div", { className: "rounded-lg border p-3 sm:p-4 shadow-md bg-white", children: _jsx(QRScanner, { onScanSuccess: () => {
                        fetchData();
                        setScannerActive(false);
                        setTimeout(() => setScannerActive(true), 5000);
                    } }) })), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3 sm:pb-6", children: [_jsx(CardTitle, { className: "text-lg sm:text-xl", children: "Asistencias Recientes" }), _jsx(CardDescription, { className: "text-sm", children: "\u00DAltimos registros de asistencia" })] }), _jsx(CardContent, { className: "p-3 sm:p-6", children: _jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: recentAttendances.length > 0 ? (recentAttendances.map((record) => (_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3 sm:gap-4", children: [_jsxs("div", { className: "flex items-center space-x-3 sm:space-x-4 flex-1", children: [_jsx(Avatar, { className: "h-10 w-10 sm:h-12 sm:w-12 bg-uaa-blue text-white flex items-center justify-center rounded-full flex-shrink-0", children: _jsx(AvatarFallback, { className: "text-sm font-semibold", children: record.student.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "font-medium text-gray-900 text-sm sm:text-base truncate", children: record.student.name }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: record.student.matricula }), _jsx("p", { className: "text-xs sm:text-sm text-gray-600 font-medium truncate", children: record.activity.title })] })] }), _jsxs("div", { className: "flex flex-col sm:text-right space-y-2", children: [_jsxs("div", { className: "flex flex-wrap gap-1 sm:gap-2 sm:justify-end", children: [_jsx(Badge, { className: `text-xs ${record.activity.type === "academic"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-pink-100 text-pink-800"}`, children: record.activity.type === "academic" ? "Conferencia" : "Actividad" }), _jsxs(Badge, { className: "bg-green-100 text-green-800 text-xs", children: [_jsx("svg", { className: "h-3 w-3 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), "Registrado"] })] }), _jsxs("div", { className: "flex flex-col sm:items-end space-y-1", children: [_jsxs("p", { className: "text-xs sm:text-sm text-gray-500 flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), formatTime(record.timestamp)] }), _jsx("p", { className: "text-xs text-gray-400", children: formatDate(record.timestamp) })] })] })] }, record.id)))) : (_jsx("div", { className: "text-center py-8 text-gray-500", children: _jsx("div", { className: "text-sm sm:text-base", children: "No hay asistencias recientes." }) })) }) })] })] }));
}
export default RegistroAsistencias;
