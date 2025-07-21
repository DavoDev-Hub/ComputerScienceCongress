import { useEffect, useState } from "react";
import { getAllAlumnosWithAsistencias } from "@/services/apiAsistencia";
import StudentDetailModal from "@/components/adminComponents/modals/StudentDetailModal";
import StudentTable from "@/components/adminComponents/tables/StudentTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import { AlumnoConAsistencias } from "@/types/alumno";


function StudentPanel() {
    const { collapsed } = useSidebar()
    const [alumnos, setAlumnos] = useState<AlumnoConAsistencias[]>([])
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
    const [selectedAlumno, setSelectedAlumno] = useState<AlumnoConAsistencias | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getAllAlumnosWithAsistencias().then(setAlumnos)
    }, [])

    const uniqueSemesters = [...new Set(alumnos.map((a) => a.semestre))].sort((a, b) => a - b)

    const filteredAlumnos = selectedSemester
        ? alumnos.filter((a) => a.semestre === selectedSemester)
        : alumnos

    return (

        <div
            className={`min-h-screen overflow-x-hidden transition-all duration-300 p-4 sm:p-6 space-y-6 ${collapsed ? "lg:pl-30" : "lg:pl-80"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Gestión de Alumnos</h2>
                    <p className="text-gray-600">Visualiza alumnos y sus asistencias por semestre</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                        Descargar Excel
                    </Button>
                    <Select
                        value={selectedSemester !== null ? selectedSemester.toString() : "all"}
                        onValueChange={(value) =>
                            setSelectedSemester(value === "all" ? null : Number.parseInt(value))
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filtrar por semestre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los semestres</SelectItem>
                            {uniqueSemesters.map((s) => (
                                <SelectItem key={s} value={s.toString()}>{s}° Semestre</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-2xl font-bold text-gray-900">{filteredAlumnos.length}</p>
                        <p className="text-sm text-gray-600">Total Alumnos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-2xl font-bold text-blue-600">
                            {filteredAlumnos.reduce((sum, a) => sum + a.asistenciasConferencias, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Asistencias Conferencias</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-2xl font-bold text-pink-600">
                            {filteredAlumnos.reduce((sum, a) => sum + a.asistenciasActividades, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Asistencias Actividades</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Alumnos {selectedSemester ? `- ${selectedSemester}° Semestre` : ""}</CardTitle>
                </CardHeader>
                <CardContent>
                    <StudentTable
                        alumnos={filteredAlumnos}
                        onDetalle={(alumno) => {
                            setSelectedAlumno(alumno)
                            setIsModalOpen(true)
                        }}
                    />
                </CardContent>
            </Card>
            <StudentDetailModal
                alumno={selectedAlumno}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdated={() => getAllAlumnosWithAsistencias().then(setAlumnos)}
            />

        </div>
    )
}

export default StudentPanel

