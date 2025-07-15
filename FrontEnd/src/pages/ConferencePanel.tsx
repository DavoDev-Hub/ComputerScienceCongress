import { useState, useEffect } from "react"
import type { Conferencia } from "../types/conference"
import { ActivityCard } from "../components/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent } from "../components/ui/card"
import { BookOpen, Users, Trophy, QrCode } from 'lucide-react'
import { ModalCrearActividad } from "../components/modalActivityAdd"
import { getConferencias, eliminarConferencia, editarConferencia } from "../services/apiConference"
import { toast } from "sonner"

function conferencePanel() {
    const [conferencias, setConferencias] = useState<Conferencia[]>([])
    const [editingConferencias, setEditingActividad] = useState<Conferencia | null>(null)

    //
    const fetchConferencias = async () => {
        const data = await getConferencias()
        setConferencias(data)
    }

    // 
    useEffect(() => {
        fetchConferencias()
    }, [])

    //
    const handleDelete = async (id: string) => {
        try {
            await eliminarConferencia(id)
            toast.success("Actividad eliminada exitosamente")
            setConferencias((prev) => prev.filter((act) => act.id !== id))
        } catch (error) {
            toast.error("Error al eliminar la actividad")
        }
    }




    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Panel de Administración de Conferencias</h2>
                <p className="text-gray-600">Gestiona todas las conferencias del congreso</p>
            </div>
            <ModalCrearActividad onSuccess={fetchConferencias} />

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

            {editingConferencias && (
                <ModalCrearActividad
                    onSuccess={() => {
                        fetchConferencias()
                        setEditingActividad(null)
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

