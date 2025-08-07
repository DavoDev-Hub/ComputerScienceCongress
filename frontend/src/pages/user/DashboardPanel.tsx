import { useEffect, useState } from "react";
import { BookOpen, Gamepad2, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStudentDashboard } from "@/services/userServices/apiDashboard";
import { Activity, Conference } from "@/types/userTypes/dashboardTypes";
import StatCard from "@/components/userComponents/dashboardStatCard";

const getBadgeColors = (type: string) => {
    switch (type.toLowerCase()) {
        case "academic":
            return "bg-blue-500/20 text-[#002E5D] border-blue-500/30";
        case "recreational":
            return "bg-green-500/20 text-green-800 border-green-500/30";
        case "conference":
            return "bg-purple-500/20 text-purple-800 border-purple-500/30";
        default:
            return "bg-gray-500/20 text-gray-800 border-gray-500/30";
    }
};

const DashboardAlumno = () => {
    const [actividades, setActividades] = useState<Activity[]>([]);
    const [conferencias, setConferencias] = useState<Conference[]>([]);

    const academicCount = actividades.filter(a => a.tipo === "academic").length + conferencias.length;
    const recreationalCount = actividades.filter(a => a.tipo === "recreational").length;
    const totalInscritas = actividades.length + conferencias.length;

    useEffect(() => {
        let ignore = false;
        const fetchDashboard = async () => {
            try {
                const { actividades, conferencias } = await getStudentDashboard();
                if (!ignore) {
                    setActividades(actividades);
                    setConferencias(conferencias);
                }
            } catch (error) {
                console.error("Error cargando actividades", error);
            }
        };
        fetchDashboard();
        return () => {
            ignore = true;
        };
    }, []);

    const combinedEvents = [
        ...actividades.map(a => ({ ...a, tipoEntidad: a.tipo })),
        ...conferencias.map(c => ({ ...c, tipoEntidad: "conference" }))
    ].sort((a, b) => new Date(a.fecha || "").getTime() - new Date(b.fecha || "").getTime());

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard icon={BookOpen} count={academicCount} label="Actividades Académicas" />
                    <StatCard icon={Gamepad2} count={recreationalCount} label="Actividades Recreativas" />
                    <StatCard icon={Star} count={totalInscritas} label="Total Inscritas" />
                </div>

                {combinedEvents.length > 0 && (
                    <Card className="bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="p-6 border-b border-gray-100">
                            <CardTitle className="text-[#002E5D] flex items-center space-x-3 text-2xl font-bold">
                                <Clock className="w-6 h-6 text-blue-600" />
                                <span>Próximos Eventos</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {combinedEvents
                                    .slice(0, 3)
                                    .map((evento, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-white/70 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer"
                                        >
                                            <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                                <Clock className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-[#002E5D] text-lg truncate">{evento.nombre}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(evento.fecha || "").toLocaleDateString("es-ES", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}{" "}
                                                    •{" "}
                                                    {new Date(evento.horaInicio || "").toLocaleTimeString("es-ES", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-full ${getBadgeColors(evento.tipoEntidad)}`}
                                            >
                                                {evento.tipoEntidad === "academic" ? "Académica" : evento.tipoEntidad === "recreational" ? "Recreativa" : "Conferencia"}
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
                {combinedEvents.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        <p className="text-lg">No hay próximos eventos inscritos.</p>
                        <p className="text-sm">¡Explora y regístrate en nuevas actividades!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardAlumno;

