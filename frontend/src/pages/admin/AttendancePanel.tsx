
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, QrCode } from "lucide-react"
import type { AttendanceRecord } from "@/types/adminTypes/asistencia"
import { getRecentAttendance } from "@/services/adminServices/apiAsistencia"
import QRScanner from "@/components/adminComponents/qr/QrScanner"

function RegistroAsistencias() {
    const [scannerActive, setScannerActive] = useState(false)
    const [recentAttendances, setRecentAttendances] = useState<AttendanceRecord[]>([])

    const fetchData = async () => {
        try {
            const data = await getRecentAttendance()
            setRecentAttendances(data)
        } catch (error) {
            console.error("Error al obtener asistencias recientes:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    }

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    return (
        <div className="min-h-screen overflow-x-hidden space-y-4 sm:space-y-6 px-4 sm:px-6 mx-auto">
            {/* Header Section - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Control de Asistencias</h2>
                    <p className="text-sm sm:text-base text-gray-600">Escanea códigos QR y gestiona asistencias en tiempo real</p>
                </div>
                <div className="flex items-center">
                    <Button
                        className={`w-full sm:w-auto ${scannerActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        onClick={() => setScannerActive(!scannerActive)}
                    >
                        <QrCode className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">{scannerActive ? "Detener Scanner" : "Activar Scanner QR"}</span>
                        <span className="sm:hidden">{scannerActive ? "Detener" : "Activar QR"}</span>
                    </Button>
                </div>
            </div>

            {/* QR Scanner Section */}
            {scannerActive && (
                <div className="rounded-lg border p-3 sm:p-4 shadow-md bg-white">
                    <QRScanner
                        onScanSuccess={() => {
                            fetchData()
                            setScannerActive(false)
                            setTimeout(() => setScannerActive(true), 5000)
                        }}
                    />
                </div>
            )}

            {/* Recent Attendances Card */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl">Asistencias Recientes</CardTitle>
                    <CardDescription className="text-sm">Últimos registros de asistencia</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {recentAttendances.length > 0 ? (
                            recentAttendances.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                                >
                                    {/* Student Info Section */}
                                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-uaa-blue text-white flex items-center justify-center rounded-full flex-shrink-0">
                                            <AvatarFallback className="text-sm font-semibold">
                                                {record.student.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{record.student.name}</p>
                                            <p className="text-xs sm:text-sm text-gray-500">{record.student.matricula}</p>
                                            <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{record.activity.title}</p>
                                        </div>
                                    </div>

                                    {/* Status and Time Section */}
                                    <div className="flex flex-col sm:text-right space-y-2">
                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-1 sm:gap-2 sm:justify-end">
                                            <Badge
                                                className={`text-xs ${record.activity.type === "academic"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-pink-100 text-pink-800"
                                                    }`}
                                            >
                                                {record.activity.type === "academic" ? "Conferencia" : "Actividad"}
                                            </Badge>
                                            <Badge className="bg-green-100 text-green-800 text-xs">
                                                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Registrado
                                            </Badge>
                                        </div>

                                        {/* Time and Date */}
                                        <div className="flex flex-col sm:items-end space-y-1">
                                            <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {formatTime(record.timestamp)}
                                            </p>
                                            <p className="text-xs text-gray-400">{formatDate(record.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-sm sm:text-base">No hay asistencias recientes.</div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegistroAsistencias

