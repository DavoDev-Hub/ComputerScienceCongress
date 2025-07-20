import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import type { AlumnoConAsistencias } from "@/types/alumno"

interface StudentTableProps {
    alumnos: AlumnoConAsistencias[]
    onDetalle: (alumno: AlumnoConAsistencias) => void
}

const StudentTable = ({ alumnos, onDetalle }: StudentTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Alumno</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Matrícula</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Semestre</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Conferencias</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Actividades</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Total</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((a) => (
                        <tr key={a.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10 bg-uaa-blue text-white flex items-center justify-center rounded-full">
                                        <AvatarFallback className="text-sm font-semibold">
                                            {a.nombre
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">{a.nombre}</p>
                                        <p className="text-sm text-gray-500">{a.correo}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{a.matricula}</td>
                            <td className="py-4 px-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-uaa-blue text-white">
                                    {a.semestre}°
                                </span>
                            </td>
                            <td className="py-4 px-4 text-center text-blue-600 font-semibold text-lg">
                                {a.asistenciasConferencias}
                            </td>
                            <td className="py-4 px-4 text-center text-pink-600 font-semibold text-lg">
                                {a.asistenciasActividades}
                            </td>
                            <td className="py-4 px-4 text-center text-green-600 font-bold text-lg">
                                {a.totalAsistencias}
                            </td>
                            <td className="py-4 px-4 text-center">
                                <Button size="sm" variant="outline" onClick={() => onDetalle(a)}>
                                    Ver Detalle
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {alumnos.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay alumnos para mostrar</p>
                </div>
            )}
        </div>
    )
}

export default StudentTable

