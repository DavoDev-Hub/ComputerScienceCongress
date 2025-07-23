import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, MapPin } from 'lucide-react'
import { DialogConfirmDelete } from "../dialogs/DialogConfirmDelete"
import { ConferenceCardProps } from '@/types/adminTypes/conference'


export const ConferenceCard: React.FC<ConferenceCardProps> = ({
    nombre,
    fecha,
    descripcion,
    lugar,
    horaInicio,
    horaFin,
    ponente,
    onEdit,
    onDelete,
}) => {
    const formattedDate = new Date(fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    const formattedHoraInicio = new Date(horaInicio).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    })

    const formattedHoraFin = new Date(horaFin).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    })


    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <Badge className="bg-uaa-blue">conferencia</Badge>
                    <div className="text-right text-sm text-gray-500">
                        <p>{formattedDate}</p>
                        <p>
                            {formattedHoraInicio} - {formattedHoraFin}
                        </p>
                    </div>
                </div>
                <CardTitle className="text-lg">{nombre}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    Por: {ponente}
                </div>
                <p className="text-sm text-gray-600 mb-4">{descripcion}</p>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {lugar}
                    </div>
                </div>
                <div className="flex justify-between gap-2 mt-4">
                    <Button variant="outline" onClick={onEdit}>
                        Editar
                    </Button>
                    <DialogConfirmDelete
                        onConfirm={onDelete}
                        trigger={
                            <Button variant="destructive" size="sm">
                                Eliminar
                            </Button>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
}



