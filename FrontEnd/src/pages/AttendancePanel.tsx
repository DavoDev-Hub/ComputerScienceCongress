import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../components/ui/select";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Clock, QrCode, Search, Users } from "lucide-react";
import { getRecentAttendances } from "../services/apiAsistencia";
import type { Attendance } from "../types/asistencia";

function AttendancePanel() {
    const [scannerActive, setScannerActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedActivity, setSelectedActivity] = useState<string>("all");
    const [attendances, setAttendances] = useState<Attendance[]>([]);

    useEffect(() => {
        getRecentAttendances()
            .then(setAttendances)
            .catch((err) => {
                console.error("Error al obtener asistencias recientes", err);
            });
    }, []);

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const filteredAttendances = attendances.filter((a) => {
        const matchesSearch =
            a.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.student.matricula.includes(searchTerm) ||
            a.activity.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesActivity =
            selectedActivity === "all" || a.activity.title === selectedActivity;

        return matchesSearch && matchesActivity;
    });

    const activitiesForFilter = Array.from(
        new Set(attendances.map((a) => a.activity.title))
    );

    const todayAttendances = attendances.filter((a) => {
        const today = new Date().toDateString();
        return new Date(a.timestamp).toDateString() === today;
    });

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Control de Asistencias</h2>
                    <p className="text-gray-600">Escanea códigos QR y gestiona asistencias en tiempo real</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Registrar Manualmente
                    </Button>
                    <Button
                        className={`${scannerActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        onClick={() => setScannerActive(!scannerActive)}
                    >
                        <QrCode className="h-4 w-4 mr-2" />
                        {scannerActive ? "Detener Scanner" : "Activar Scanner QR"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="p-2 rounded-full bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Asistencias Hoy</p>
                                <p className="text-2xl font-bold text-gray-900">{todayAttendances.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Registros</p>
                                <p className="text-2xl font-bold text-gray-900">{attendances.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-orange-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Último Registro</p>
                                <p className="text-sm font-bold text-gray-900">
                                    {attendances[0] ? formatTime(attendances[0].timestamp) : "N/A"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <QrCode className={`h-8 w-8 ${scannerActive ? "text-green-600" : "text-gray-400"}`} />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Scanner</p>
                                <p className="text-sm font-bold text-gray-900">{scannerActive ? "Activo" : "Inactivo"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Asistencias Recientes</CardTitle>
                            <CardDescription>Últimos registros de asistencia</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Buscar..."
                                    className="pl-10 w-48"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filtrar actividad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las actividades</SelectItem>
                                    {activitiesForFilter.map((activity) => (
                                        <SelectItem key={activity} value={activity}>
                                            {activity.length > 25 ? `${activity.substring(0, 25)}...` : activity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredAttendances.map((record) => (
                            <div
                                key={record.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-uaa-blue text-white">
                                            {record.student.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">{record.student.name}</p>
                                        <p className="text-sm text-gray-500">{record.student.matricula}</p>
                                        <p className="text-sm text-gray-600 font-medium">{record.activity.title}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Badge className={record.activity.type === "academic" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}>
                                            {record.activity.type === "academic" ? "Conferencia" : "Actividad"}
                                        </Badge>
                                        <Badge className="bg-green-100 text-green-800">
                                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Registrado
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {formatTime(record.timestamp)}
                                    </p>
                                    <p className="text-xs text-gray-400">{formatDate(record.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export default AttendancePanel
