import { useEffect, useState } from "react";
import { BookOpen, Gamepad2, Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStudentDashboard } from "@/services/userServices/apiDashboard";
import { Activity, Conference } from "@/types/userTypes/dashboardTypes";
import StatCard from "@/components/userComponents/dashboardStatCard";

const DashboardAlumno = () => {
    const [actividades, setActividades] = useState<Activity[]>([]);
    const [conferencias, setConferencias] = useState<Conference[]>([]);

    const academicCount = actividades.filter(a => a.tipo === "academic" || a.tipo === "conference").length;
    const recreationalCount = actividades.filter(a => a.tipo === "recreational").length;

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { actividades, conferencias } = await getStudentDashboard();
                setActividades(actividades);
                setConferencias(conferencias);
            } catch (error) {
                console.error("Error cargando actividades", error);
            }
        };

        fetchDashboard();
    }, []);

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
                <StatCard icon={Star} count={actividades.length} label="Total Inscritas" />
            </div>

            {/* Próximas actividades */}
            {(actividades.length > 0 || conferencias.length > 0) && (
                <Card className="bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#002E5D] flex items-center space-x-2">
                            <Clock className="w-5 h-5" />
                            <span>Próximos Eventos</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...actividades.map(a => ({ ...a, tipoEntidad: "actividad" })), ...conferencias.map(c => ({ ...c, tipoEntidad: "conferencia" }))]
                                .sort((a, b) => new Date(a.fecha || "").getTime() - new Date(b.fecha || "").getTime())
                                .slice(0, 3)
                                .map((evento, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl shadow-lg">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-[#002E5D]">{evento.nombre}</h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(evento.fecha || "").toLocaleDateString()} •{" "}
                                                {new Date(evento.horaInicio || "").toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className={`bg-blue-500/20 text-[#002E5D] border-blue-500/30`}
                                        >
                                            {evento.tipoEntidad === "actividad" && "tipo" in evento ? evento.tipo : "Conferencia"}
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DashboardAlumno;

