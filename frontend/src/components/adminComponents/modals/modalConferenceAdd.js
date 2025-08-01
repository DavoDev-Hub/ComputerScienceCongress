import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { crearConferencia, editarConferencia } from "@/services/adminServices/apiConference";
import { toast } from "sonner";
export function ModalCrearConferencia({ onSuccess, initialData }) {
    const isEditando = Boolean(initialData);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        ponente: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        lugar: ""
    });
    useEffect(() => {
        if (isEditando && initialData) {
            setFormData({
                nombre: initialData.nombre || "",
                ponente: initialData.ponente || "",
                descripcion: initialData.descripcion || "",
                fecha: initialData.fecha?.split("T")[0] || "",
                horaInicio: initialData.horaInicio?.split("T")[1]?.slice(0, 5) || "",
                horaFin: initialData.horaFin?.split("T")[1]?.slice(0, 5) || "",
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
    const handleSubmit = async () => {
        if (!isValid)
            return;
        const conferencia = {
            ...formData,
            horaInicio: `${formData.fecha}T${formData.horaInicio}`,
            horaFin: `${formData.fecha}T${formData.horaFin}`
        };
        try {
            if (isEditando) {
                await editarConferencia(initialData.id, conferencia);
                toast("Conferencia actualizada", {
                    description: `La actividad "${formData.nombre}" fue modificada correctamente.`,
                    duration: 5000
                });
            }
            else {
                await crearConferencia(conferencia);
                toast("Conferencia creada", {
                    description: `La conferencia "${formData.nombre}" fue registrada exitosamente.`,
                    duration: 5000
                });
            }
            onSuccess();
            setFormData({
                nombre: "",
                ponente: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                lugar: ""
            });
            setOpen(false);
        }
        catch (error) {
            console.error("Error al guardar conferencia:", error);
            toast("Error", {
                description: "Ocurrió un problema al guardar la conferencia.",
                duration: 5000
            });
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [!isEditando && (_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "bg-uaa-blue text-white hover:bg-uaa-blue/90", children: "Agregar Conferencia" }) })), _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: isEditando ? "Editar Conferencia" : "Crear Nueva Actividad" }), _jsx("p", { className: "text-sm text-muted-foreground", children: isEditando
                                    ? "Modifica los campos necesarios para actualizar la conferencia"
                                    : "Completa la información para crear una nueva conferencia" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsx("div", { className: "grid grid-cols-2 gap-4", children: _jsx(Input, { name: "nombre", placeholder: "Nombre de la conferencia", value: formData.nombre, onChange: handleChange }) }), _jsx(Textarea, { name: "descripcion", placeholder: "Descripci\u00F3n de la conferencia", value: formData.descripcion, onChange: handleChange }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: _jsx(Input, { type: "date", name: "fecha", value: formData.fecha, onChange: handleChange }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { name: "horaInicio", type: "time", placeholder: "Hora inicio (ej. 14:00)", value: formData.horaInicio, onChange: handleChange }), _jsx(Input, { name: "horaFin", type: "time", placeholder: "Hora fin (ej. 16:30)", value: formData.horaFin, onChange: handleChange })] }), _jsx(Input, { name: "ponente", placeholder: "Ponente", value: formData.ponente, onChange: handleChange }), _jsx(Input, { name: "lugar", placeholder: "Lugar", value: formData.lugar, onChange: handleChange })] }), _jsxs(DialogFooter, { className: "gap-2 sm:justify-end", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancelar" }) }), _jsx(Button, { onClick: handleSubmit, className: "bg-uaa-blue text-white hover:bg-uaa-blue/90", disabled: !isValid, children: isEditando ? "Guardar Cambios" : "Crear Conferencia" })] })] })] }));
}
