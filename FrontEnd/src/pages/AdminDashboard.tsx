import { useEffect, useState } from "react"
import { getActividades } from "../services/api"
import type { Actividad } from "../types/activity"
import { ActivityCard } from "../components/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent } from "../components/ui/card"
import { BookOpen, Users, Trophy, QrCode } from 'lucide-react'
import { Button } from "../components/ui/button"
import { ModalCrearActividad } from "../components/modalActivityAdd"
import { toast } from "sonner"
import { eliminarActividad } from "../services/api"


export default function AdminDashboard() {
    const [actividades, setActividades] = useState<Actividad[]>([])

    useEffect(() => {
        getActividades().then(setActividades)
    }, [])

    const filteredActividades = (tipo: "all" | "academico" | "recreativo") => {
        return actividades.filter((actividad) => tipo === "all" || actividad.tipo === tipo)
    }


    const handleDelete = async (id: string) => {
        try {
            await eliminarActividad(id)
            toast.success("Actividad eliminada exitosamente")
            setActividades((prev) => prev.filter((act) => act.id !== id))
        } catch (error) {
            toast.error("Error al eliminar la actividad")
        }
    }


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Panel de Administración</h2>
                    <p className="text-gray-600">Gestiona todas las actividades del congreso</p>
                </div>
                <ModalCrearActividad onSuccess={() => getActividades().then(setActividades)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-uaa-blue" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Conferencias y Actividades</p>
                                <p className="text-2xl font-bold text-gray-900">6</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-uaa-orange" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Inscritos</p>
                                <p className="text-2xl font-bold text-gray-900">484</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Trophy className="h-8 w-8 text-uaa-pink" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Actividad Popular</p>
                                <p className="text-sm font-bold text-gray-900">IA en Medicina</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <QrCode className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">QR Escaneados</p>
                                <p className="text-2xl font-bold text-gray-900">156</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="academico">Académicas</TabsTrigger>
                    <TabsTrigger value="recreativo">Recreativas</TabsTrigger>
                </TabsList>
                {["all", "academico", "recreativo"].map((tipo) => (
                    <TabsContent key={tipo} value={tipo}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredActividades(tipo as "all" | "academico" | "recreativo").map((actividad) => (
                                <ActivityCard
                                    key={actividad.id}
                                    nombre={actividad.nombre}
                                    descripcion={actividad.descripcion}
                                    fecha={actividad.fecha}
                                    lugar={actividad.lugar}
                                    horaInicio={actividad.horaInicio}
                                    horaFin={actividad.horaFin}
                                    cupo={actividad.cupo}
                                    tipo={actividad.tipo}
                                    onEdit={() => console.log("Editar", actividad.id)}
                                    onDelete={() => handleDelete(actividad.id)}
                                    onView={() => console.log("Ver asistentes", actividad.id)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )

}

