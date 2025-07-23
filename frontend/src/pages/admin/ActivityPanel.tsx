import { useEffect, useState } from "react"
import { getActividades, eliminarActividad } from "@/services/adminServices/apiActivity"
import type { Actividad } from "@/types/adminTypes/activity"
import { ActivityCard } from "@/components/adminComponents/cards/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModalCrearActividad } from "@/components/adminComponents/modals/modalActivityAdd"
import { toast } from "sonner"

function ActivityPanel() {
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

    const handleDelete = async (id: number) => {
        try {
            await eliminarActividad(id.toString())
            toast.success("Actividad eliminada exitosamente")
            setActividades((prev) => prev.filter((act) => act.id !== id))
        } catch (error) {
            toast.error("Error al eliminar la actividad")
        }
    }

    return (
        <div className="min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Panel de administración de actividades
                    </h2>
                    <p className="text-gray-600">Gestiona todas las actividades del congreso</p>
                </div>
                <ModalCrearActividad onSuccess={fetchActividades} />
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
                                    tipo={actividad.tipo as "academico" | "recreativo"}
                                    onEdit={() => setEditingActividad(actividad)}
                                    onDelete={() => handleDelete(actividad.id!)}
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
                />
            )}
        </div>
    )
}

export default ActivityPanel
