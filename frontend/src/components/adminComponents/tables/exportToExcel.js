import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
function exportAlumnosToExcel(alumnos, semestreFiltrado) {
    const data = alumnos.map((alumno) => ({
        Nombre: alumno.nombre,
        Matrícula: alumno.matricula,
        Semestre: alumno.semestre,
        Asistencias_Conferencias: alumno.asistenciasConferencias,
        Asistencias_Actividades: alumno.asistenciasActividades,
        Total_Asistencias: alumno.totalAsistencias
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asistencias");
    const fileName = semestreFiltrado
        ? `Alumnos_Semestre_${semestreFiltrado}.xlsx`
        : "Alumnos_Todos.xlsx";
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
}
export default exportAlumnosToExcel;
