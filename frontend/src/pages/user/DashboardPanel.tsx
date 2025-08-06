import { useEffect, useState } from "react"
import { BookOpen, Gamepad2, Star, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { getStudentActivities } from "@/services/userServices/apiActivities"
// import { Activity } from "@/types/userTypes/activityTypes"

const DashboardAlumno = () => {
    const [enrolledActivities, setEnrolledActivities] = useState<Activity[]>([])

    const academicCount = enrolledActivities.filter((a) => a.type === "academic" || a.type === "conference").length
    const recreationalCount = enrolledActivities.filter((a) => a.type === "recreational").length

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getStudentActivities()
                setEnrolledActivities(response)
            } catch (error) {
                console.error("Error cargando actividades", error)
            }
        }

        fetchActivities()
    }, [])

    return (
        <div className="space-y-8">
            {/* Título y bienvenida */}
            <div className="text-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 bg-clip-text text-transparent mb-4">
                    ¡Bienvenido a la Semana de Congresos!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Descubre, aprende y conéctate con las mejores actividades académicas y recreativas de la UAA.
                </p>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={BookOpen} count={academicCount} label="Actividades Académicas" />
                <StatCard icon={Gamepad2} count={recreationalCount} label="Actividades Recreativas" />
                <StatCard icon={Star} count={enrolledActivities.length} label="Total Inscritas" />
            </div>

            {/* Próximas actividades */}
            {enrolledActivities.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#002E5D] flex items-center space-x-2">
                            <Clock className="w-5 h-5" />
                            <span>Próximas Actividades</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {enrolledActivities.slice(0, 3).map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                        <activity.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-[#002E5D]">{activity.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            {activity.date} • {activity.time}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-500/20 text-[#002E5D] border-blue-500/30">
                                        {activity.category}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default DashboardAlumno

