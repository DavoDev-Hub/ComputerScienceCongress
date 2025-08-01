import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getAllAlumnosWithAsistencias } from "@/services/adminServices/apiAsistencia";
import StudentDetailModal from "@/components/adminComponents/modals/StudentDetailModal";
import StudentTable from "@/components/adminComponents/tables/StudentTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import exportAlumnosToExcel from "@/components/adminComponents/tables/exportToExcel";
function StudentPanel() {
    const [alumnos, setAlumnos] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        getAllAlumnosWithAsistencias().then(setAlumnos);
    }, []);
    const uniqueSemesters = [...new Set(alumnos.map((a) => a.semestre))].sort((a, b) => a - b);
    const filteredAlumnos = selectedSemester ? alumnos.filter((a) => a.semestre === selectedSemester) : alumnos;
    return (_jsxs("div", { className: "min-h-screen overflow-x-hidden space-y-4 sm:space-y-6 px-4 sm:px-6 mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "Gesti\u00F3n de Alumnos" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Visualiza alumnos y sus asistencias por semestre" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-3", children: [_jsxs(Button, { variant: "outline", className: "bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto", onClick: () => exportAlumnosToExcel(filteredAlumnos, selectedSemester), children: [_jsx("span", { className: "hidden sm:inline", children: "Descargar Excel" }), _jsx("span", { className: "sm:hidden", children: "Descargar" })] }), _jsxs(Select, { value: selectedSemester !== null ? selectedSemester.toString() : "all", onValueChange: (value) => setSelectedSemester(value === "all" ? null : Number.parseInt(value)), children: [_jsx(SelectTrigger, { className: "w-full sm:w-48", children: _jsx(SelectValue, { placeholder: "Filtrar por semestre" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos los semestres" }), uniqueSemesters.map((s) => (_jsxs(SelectItem, { value: s.toString(), children: [s, "\u00B0 Semestre"] }, s)))] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3 sm:pb-6", children: _jsxs(CardTitle, { className: "text-lg sm:text-xl", children: ["Alumnos ", selectedSemester ? `- ${selectedSemester}° Semestre` : ""] }) }), _jsx(CardContent, { className: "p-3 sm:p-6", children: _jsx("div", { className: "overflow-x-auto", children: _jsx(StudentTable, { alumnos: filteredAlumnos, onDetalle: (alumno) => {
                                    setSelectedAlumno(alumno);
                                    setIsModalOpen(true);
                                } }) }) })] }), _jsx(StudentDetailModal, { alumno: selectedAlumno, isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onUpdated: () => getAllAlumnosWithAsistencias().then(setAlumnos) })] }));
}
export default StudentPanel;
