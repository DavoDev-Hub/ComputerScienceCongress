import { useEffect, useState } from "react"
import { getAllAlumnosWithAsistencias } from "@/services/adminServices/apiAsistencia"
import StudentDetailModal from "@/components/adminComponents/modals/StudentDetailModal"
import type { AlumnoConAsistencias } from "@/types/adminTypes/alumno"
import StudentTable from "@/components/adminComponents/tables/StudentTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import exportAlumnosToExcel from "@/components/adminComponents/tables/exportToExcel"

function StudentPanel() {
    const [alumnos, setAlumnos] = useState<AlumnoConAsistencias[]>([])
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
    const [selectedAlumno, setSelectedAlumno] = useState<AlumnoConAsistencias | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getAllAlumnosWithAsistencias().then(setAlumnos)
    }, [])

    const uniqueSemesters = [...new Set(alumnos.map((a) => a.semestre))].sort((a, b) => a - b)
    const filteredAlumnos = selectedSemester ? alumnos.filter((a) => a.semestre === selectedSemester) : alumnos

    return (
        <div className="min-h-screen overflow-x-hidden space-y-4 sm:space-y-6 px-4 sm:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Alumnos</h2>
                    <p className="text-sm sm:text-base text-gray-600">Visualiza alumnos y sus asistencias por semestre</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-3">
                    <Button
                        variant="outline"
                        className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                        onClick={() => exportAlumnosToExcel(filteredAlumnos, selectedSemester)}
                    >
                        <span className="hidden sm:inline">Descargar Excel</span>
                        <span className="sm:hidden">Descargar</span>
                    </Button>

                    <Select
                        value={selectedSemester !== null ? selectedSemester.toString() : "all"}
                        onValueChange={(value) => setSelectedSemester(value === "all" ? null : Number.parseInt(value))}
                    >
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por semestre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los semestres</SelectItem>
                            {uniqueSemesters.map((s) => (
                                <SelectItem key={s} value={s.toString()}>
                                    {s}° Semestre
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl">
                        Alumnos {selectedSemester ? `- ${selectedSemester}° Semestre` : ""}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                    <div className="overflow-x-auto">
                        <StudentTable
                            alumnos={filteredAlumnos}
                            onDetalle={(alumno) => {
                                setSelectedAlumno(alumno)
                                setIsModalOpen(true)
                            }}
                        />
                    </div>
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

