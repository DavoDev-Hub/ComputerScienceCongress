import type { Actividad } from "../types/activity"
import { ActivityCard } from "../components/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent } from "../components/ui/card"
import { BookOpen, Users, Trophy, QrCode } from 'lucide-react'
import { ModalCrearActividad } from "../components/modalActivityAdd"


function conferencePanel() {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Panel de Administración de Conferencias</h2>
                <p className="text-gray-600">Gestiona todas las conferencias del congreso</p>
            </div>
            <ModalCrearActividad onSuccess={fetchActividades} />
        </div >
    )
}


export default conferencePanel

