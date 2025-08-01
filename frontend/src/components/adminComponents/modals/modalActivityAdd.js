import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { crearActividad, editarActividad } from "@/services/adminServices/apiActivity";
import { toast } from "sonner";
export function ModalCrearActividad({ onSuccess, initialData }) {
    const isEditando = Boolean(initialData);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        cupo: "",
        lugar: ""
    });
    useEffect(() => {
        if (isEditando && initialData) {
            setFormData({
                nombre: initialData.nombre || "",
                tipo: initialData.tipo || "",
                descripcion: initialData.descripcion || "",
                fecha: initialData.fecha?.split("T")[0] || "",
                horaInicio: initialData.horaInicio?.split("T")[1]?.slice(0, 5) || "",
                horaFin: initialData.horaFin?.split("T")[1]?.slice(0, 5) || "",
                cupo: initialData.cupo?.toString() || "",
                lugar: initialData.lugar || ""
            });
            setOpen(true);
        }
    }, [initialData]);
    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSelect = (value) => {
        setFormData((prev) => ({ ...prev, tipo: value }));
    };
    const handleSubmit = async () => {
        if (!isValid)
            return;
        const actividad = {
            ...formData,
            cupo: parseInt(formData.cupo),
            horaInicio: `${formData.fecha}T${formData.horaInicio}`,
            horaFin: `${formData.fecha}T${formData.horaFin}`
        };
        try {
            if (isEditando) {
                await editarActividad(initialData.id, actividad);
                toast("Actividad actualizada", {
                    description: `La actividad "${formData.nombre}" fue modificada correctamente.`,
                    duration: 5000
                });
            }
            else {
                await crearActividad(actividad);
                toast("Actividad creada", {
                    description: `La actividad "${formData.nombre}" fue registrada exitosamente.`,
                    duration: 5000
                });
            }
            onSuccess();
            setFormData({
                nombre: "",
                tipo: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                cupo: "",
                lugar: ""
            });
            setOpen(false);
        }
        catch (error) {
            console.error("Error al guardar actividad:", error);
            toast("Error", {
                description: "Ocurrió un problema al guardar la actividad.",
                duration: 5000
            });
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [!isEditando && (_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "bg-uaa-blue text-white hover:bg-uaa-blue/90", children: "Agregar Actividad" }) })), _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: isEditando ? "Editar Actividad" : "Crear Nueva Actividad" }), _jsx("p", { className: "text-sm text-muted-foreground", children: isEditando
                                    ? "Modifica los campos necesarios para actualizar la actividad"
                                    : "Completa la información para crear una nueva actividad" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { name: "nombre", placeholder: "Nombre de la actividad", value: formData.nombre, onChange: handleChange }), _jsxs(Select, { onValueChange: handleSelect, defaultValue: formData.tipo, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Seleccionar tipo" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "academico", children: "Acad\u00E9mico" }), _jsx(SelectItem, { value: "recreativo", children: "Recreativo" })] })] })] }), _jsx(Textarea, { name: "descripcion", placeholder: "Descripci\u00F3n de la actividad", value: formData.descripcion, onChange: handleChange }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { type: "date", name: "fecha", value: formData.fecha, onChange: handleChange }), _jsx(Input, { name: "cupo", type: "number", placeholder: "Cupo", value: formData.cupo, onChange: handleChange })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { name: "horaInicio", type: "time", placeholder: "Hora inicio (ej. 14:00)", value: formData.horaInicio, onChange: handleChange }), _jsx(Input, { name: "horaFin", type: "time", placeholder: "Hora fin (ej. 16:30)", value: formData.horaFin, onChange: handleChange })] }), _jsx(Input, { name: "lugar", placeholder: "Lugar", value: formData.lugar, onChange: handleChange })] }), _jsxs(DialogFooter, { className: "gap-2 sm:justify-end", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancelar" }) }), _jsx(Button, { onClick: handleSubmit, className: "bg-uaa-blue text-white hover:bg-uaa-blue/90", disabled: !isValid, children: isEditando ? "Guardar Cambios" : "Crear Actividad" })] })] })] }));
}
