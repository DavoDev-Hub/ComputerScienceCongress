import { useEffect, useState } from "react"
import { getActividades, eliminarActividad } from "@/services/apiActivity"
import type { Actividad } from "@/types/activity"
import { ActivityCard } from "@/components/adminComponents/cards/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Trophy, QrCode } from "lucide-react"
import { ModalCrearActividad } from "@/components/adminComponents/modals/modalActivityAdd"
import { toast } from "sonner"
import { useSidebar } from "@/context/SidebarContext"

function ActivityPanel() {
    const { collapsed } = useSidebar()
    const [actividades, setActividades] = useState<Actividad[]>([])
    const [editingActividad, setEditingActividad] = useState<Actividad | null>(null)

    const fetchActividades = async () => {
        const data = await getActividades()
        setActividades(data)
    }

    useEffect(() => {
        fetchActividades()
    }, [])

    const filteredActividades = (tipo: "all" | "academico" | "recreativo") =>
        actividades.filter((actividad) => tipo === "all" || actividad.tipo === tipo)

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
        <div
            className={`min-h-screen overflow-x-hidden transition-all duration-300 p-4 sm:p-6 space-y-6 ${collapsed ? "lg:pl-30" : "lg:pl-80"
                }`}
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Panel de administración de actividades
                    </h2>
                    <p className="text-gray-600">Gestiona todas las actividades del congreso</p>
                </div>
                <ModalCrearActividad onSuccess={fetchActividades} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-uaa-blue" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Total Conferencias y Actividades
                                </p>
                                <p className="text-2xl font-bold text-gray-900">{actividades.length}</p>
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
                                    onEdit={() => setEditingActividad(actividad)}
                                    onDelete={() => handleDelete(actividad.id)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {editingActividad && (
                <ModalCrearActividad
                    onSuccess={() => {
                        fetchActividades()
                        setEditingActividad(null)
                    }}
                    initialData={editingActividad}
                    isEditing
                    actividadId={editingActividad.id}
                />
            )}
        </div>
    )
}

export default ActivityPanel

