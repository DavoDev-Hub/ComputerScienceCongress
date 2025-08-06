import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ActividadCardProps {
    nombre: string
    tipo: string
    lugar: string
    fecha: string
    horaInicio: string
    horaFin: string
}

export const ActividadCard = ({
    nombre,
    tipo,
    lugar,
    fecha,
    horaInicio,
    horaFin,
}: ActividadCardProps) => {
    return (
        <Card className="bg-white/90 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#002E5D]">{nombre}</h3>
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold ${tipo === "académica"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {tipo}
                    </span>
                </div>
                <div className="flex items-center text-sm text-gray-700 gap-2">
                    <Calendar className="w-4 h-4" />
                    {fecha}
                </div>
                <div className="flex items-center text-sm text-gray-700 gap-2">
                    <Clock className="w-4 h-4" />
                    {horaInicio} - {horaFin}
                </div>
                <div className="flex items-center text-sm text-gray-700 gap-2">
                    <MapPin className="w-4 h-4" />
                    {lugar}
                </div>
            </CardContent>
        </Card>
    )
}

