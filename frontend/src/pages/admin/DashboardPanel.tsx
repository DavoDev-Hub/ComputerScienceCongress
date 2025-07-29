import { useState, useEffect } from "react"
import { getDashboardData } from "@/services/adminServices/apiDashboard"
import type { DashboardData } from "@/types/adminTypes/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Users,
    Calendar,
    QrCode,
    BookOpen,
    Gamepad2,
    Clock,
    CheckCircle,
    BarChart3,
} from "lucide-react"

function DashboardPanel() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [data, setData] = useState<DashboardData | null>(null)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDashboardData()
            setData(response)
        }
        fetchData()
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (!data) return <p className="p-6">Cargando datos del dashboard...</p>

    return (
        <div className="min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto">

            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        {formatDate(currentTime)} • {formatTime(currentTime)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Estudiantes</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.totalEstudiantes}</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Users className="h-6 w-6 text-uaa-blue" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Actividades</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.totalActividades}</p>
                            </div>
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Calendar className="h-6 w-6 text-uaa-orange" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Asistencias Hoy</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.asistenciasHoy}</p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-full">
                                <QrCode className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600">QR Escaneados Hoy</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.qrEscaneadosHoy}</p>
                            </div>
                            <div className="p-2 bg-purple-100 rounded-full">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div>
                            <CardTitle className="text-lg font-semibold">Actividades Activas</CardTitle>
                            <CardDescription>Estado actual de las actividades programadas</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.actividadesActivas.length === 0 && (
                            <p className="text-gray-500 text-sm">No hay actividades activas por el momento.</p>
                        )}
                        {data.actividadesActivas.map((actividad) => (
                            <div
                                key={actividad.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${actividad.tipo === "academico" ? "bg-blue-100" : "bg-pink-100"}`}>
                                        {actividad.tipo === "academico" ? (
                                            <BookOpen className="h-5 w-5 text-uaa-blue" />
                                        ) : (
                                            <Gamepad2 className="h-5 w-5 text-uaa-pink" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-medium text-gray-900 truncate">{actividad.nombre}</h4>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {actividad.hora}
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="h-3 w-3 mr-1" />
                                                {actividad.asistentes}/{actividad.cupo}
                                            </span>
                                        </div>
                                        <Progress value={(actividad.asistentes / actividad.cupo) * 100} className="h-2 mt-2" />
                                    </div>
                                    <Badge variant="default" className="bg-green-600">En curso</Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Asistencias Recientes</CardTitle>
                        <CardDescription>Últimos registros de QR</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.recentAttendances.map((attendance) => (
                            <div key={attendance.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-uaa-blue text-white text-sm">
                                        {attendance.estudiante
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-gray-900 text-sm truncate">{attendance.estudiante}</p>
                                    <p className="text-xs text-gray-500">{attendance.matricula}</p>
                                    <p className="text-xs text-gray-600 font-medium truncate">{attendance.actividad}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">{new Date(attendance.tiempo).toLocaleTimeString("es-MX")}</p>
                                    <div className="flex items-center justify-end mt-1">
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPanel
