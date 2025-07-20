import { useState, useEffect } from "react"
import type { Conferencia } from "@/types/conference"
import { getConferencias, eliminarConferencia } from "@/services/apiConference"
import { ConferenceCard } from "@/components/adminComponents/cards/ConferenceCard"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Trophy, QrCode } from 'lucide-react'
import { ModalCrearConferencia } from "@/components/adminComponents/modals/modalConferenceAdd"
import { toast } from "sonner"

function conferencePanel() {
    const [conferencias, setConferencias] = useState<Conferencia[]>([])
    const [editingConferencias, setEditingConferencias] = useState<Conferencia | null>(null)

    const fetchConferencias = async () => {
        const data = await getConferencias()
        setConferencias(data)
    }

    useEffect(() => {
        fetchConferencias()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await eliminarConferencia(id)
            toast.success("Conferencia eliminada exitosamente")
            setConferencias((prev) => prev.filter((act) => act.id !== id))
        } catch (error) {
            toast.error("Error al eliminar la conferencia")
        }
    }


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Panel de administración de conferencias</h2>
                    <p className="text-gray-600">Gestiona todas las conferencias del congreso</p>
                </div>
                <ModalCrearConferencia onSuccess={fetchConferencias} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-uaa-blue" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Conferencias y Actividades</p>
                                <p className="text-2xl font-bold text-gray-900">{conferencias.length}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {conferencias.map((conferencia) => (
                    <ConferenceCard
                        key={conferencia.id}
                        nombre={conferencia.nombre}
                        ponente={conferencia.ponente}
                        descripcion={conferencia.descripcion}
                        fecha={conferencia.fecha}
                        lugar={conferencia.lugar}
                        horaInicio={conferencia.horaInicio}
                        horaFin={conferencia.horaFin}
                        onEdit={() => setEditingConferencias(conferencia)}
                        onDelete={() => handleDelete(conferencia.id)}
                    />
                ))}
            </div>

            {editingConferencias && (
                <ModalCrearConferencia
                    onSuccess={() => {
                        fetchConferencias()
                        setEditingConferencias(null)
                    }}
                    initialData={editingConferencias}
                    isEditing
                    actividadId={editingConferencias.id}
                />
            )}
        </div >
    )
}


export default conferencePanel

