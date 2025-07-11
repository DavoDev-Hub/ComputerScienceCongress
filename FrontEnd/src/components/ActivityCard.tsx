import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Users, MapPin } from 'lucide-react'

type ActivityCardProps = {
  nombre: string
  fecha: string
  descripcion: string
  lugar: string
  horaInicio: string
  horaFin: string
  cupo: number
  tipo: 'academico' | 'recreativo'
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  nombre,
  fecha,
  descripcion,
  lugar,
  horaInicio,
  horaFin,
  cupo,
  tipo,
  onEdit,
  onDelete,
  onView,
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
          <Badge className="bg-uaa-blue">{tipo}</Badge>
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
        <p className="text-sm text-gray-600 mb-4">{descripcion}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            {lugar}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            0/{cupo} inscritos
          </div>
          <Progress value={50} className="h-2" />
        </div>
        <div className="flex justify-between gap-2 mt-4">
          <Button variant="outline" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

