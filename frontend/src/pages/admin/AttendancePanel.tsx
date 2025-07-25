import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, QrCode } from "lucide-react";
import { toast } from "sonner";
import type { AttendanceRecord } from "@/types/adminTypes/asistencia";
import { getRecentAttendance, createAsistencia } from "@/services/adminServices/apiAsistencia";
import QRScanner from "@/components/adminComponents/qr/QrScanner";

function RegistroAsistencias() {
    const [scannerActive, setScannerActive] = useState(false);
    const [recentAttendances, setRecentAttendances] = useState<AttendanceRecord[]>([]);
    const [lastScannedAlumno, setLastScannedAlumno] = useState<number | null>(null);
    const [scanCooldown, setScanCooldown] = useState(false);

    const fetchData = async () => {
        try {
            const data = await getRecentAttendance();
            setRecentAttendances(data);
        } catch (error) {
            console.error("Error al obtener asistencias recientes:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleScan = async (data: string | null) => {
        if (!data || scanCooldown) return;

        try {
            const parsed = JSON.parse(data);
            const { id_alumno, id_actividad, id_conferencia, fecha_asistencia } = parsed;

            if (id_alumno === lastScannedAlumno) return;

            await createAsistencia({
                id_alumno,
                id_actividad,
                id_conferencia,
                fecha_asistencia,
            });

            toast.success("Asistencia registrada correctamente");

            setLastScannedAlumno(id_alumno);
            setScanCooldown(true);
            setScannerActive(false);
            fetchData();

            setTimeout(() => {
                setScanCooldown(false);
                setLastScannedAlumno(null);
            }, 3000);
        } catch (error) {
            toast.error("QR inválido o asistencia fallida");
            console.error("Error al procesar QR:", error);
        }
    };

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

    return (
        <div className="min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Control de Asistencias</h2>
                    <p className="text-gray-600">Escanea códigos QR y gestiona asistencias en tiempo real</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button
                        className={`${scannerActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                        onClick={() => setScannerActive(!scannerActive)}
                    >
                        <QrCode className="h-4 w-4 mr-2" />
                        {scannerActive ? "Detener Scanner" : "Activar Scanner QR"}
                    </Button>
                </div>
            </div>

            {scannerActive && (
                <div className="rounded-lg border p-4 shadow-md bg-white">
                    <QRScanner onScanSuccess={handleScan} />
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Asistencias Recientes</CardTitle>
                    <CardDescription>Últimos registros de asistencia</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {recentAttendances.length > 0 ? (
                            recentAttendances.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-10 w-10 bg-uaa-blue text-white flex items-center justify-center rounded-full">
                                            <AvatarFallback className="text-sm font-semibold">
                                                {record.student.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
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
                                            <Badge
                                                className={`${record.activity.type === "academic"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-pink-100 text-pink-800"
                                                    }`}
                                            >
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
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No hay asistencias recientes.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegistroAsistencias;

