import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../ui/select"
import { crearActividad, editarActividad } from "../../services/apiActivity"
import { toast } from "sonner"

interface ModalCrearActividadProps {
    onSuccess: () => void
    initialData?: any
}


export function ModalCrearActividad({
    onSuccess,
    initialData
}: ModalCrearActividadProps) {
    const isEditando = Boolean(initialData)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        cupo: "",
        lugar: ""
    })

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
            })
            setOpen(true)
        }
    }, [initialData])

    const isValid = Object.values(formData).every((val) => val.trim() !== "")

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, tipo: value }))
    }

    const handleSubmit = async () => {
        if (!isValid) return

        const actividad = {
            ...formData,
            cupo: parseInt(formData.cupo),
            horaInicio: `${formData.fecha}T${formData.horaInicio}`,
            horaFin: `${formData.fecha}T${formData.horaFin}`
        }

        try {
            if (isEditando) {
                await editarActividad(initialData.id, actividad)
                toast("Actividad actualizada", {
                    description: `La actividad "${formData.nombre}" fue modificada correctamente.`,
                    duration: 5000
                })
            } else {
                await crearActividad(actividad)
                toast("Actividad creada", {
                    description: `La actividad "${formData.nombre}" fue registrada exitosamente.`,
                    duration: 5000
                })
            }

            onSuccess()
            setFormData({
                nombre: "",
                tipo: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                cupo: "",
                lugar: ""
            })
            setOpen(false)
        } catch (error) {
            console.error("Error al guardar actividad:", error)
            toast("Error", {
                description: "Ocurrió un problema al guardar la actividad.",
                duration: 5000
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isEditando && (
                <DialogTrigger asChild>
                    <Button className="bg-uaa-blue text-white hover:bg-uaa-blue/90">
                        Agregar Actividad
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditando ? "Editar Actividad" : "Crear Nueva Actividad"}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {isEditando
                            ? "Modifica los campos necesarios para actualizar la actividad"
                            : "Completa la información para crear una nueva actividad"}
                    </p>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            name="nombre"
                            placeholder="Nombre de la actividad"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <Select onValueChange={handleSelect} defaultValue={formData.tipo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="academico">Académico</SelectItem>
                                <SelectItem value="recreativo">Recreativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Textarea
                        name="descripcion"
                        placeholder="Descripción de la actividad"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                        <Input
                            name="cupo"
                            type="number"
                            placeholder="Cupo"
                            value={formData.cupo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            name="horaInicio"
                            type="time"
                            placeholder="Hora inicio (ej. 14:00)"
                            value={formData.horaInicio}
                            onChange={handleChange}
                        />
                        <Input
                            name="horaFin"
                            type="time"
                            placeholder="Hora fin (ej. 16:30)"
                            value={formData.horaFin}
                            onChange={handleChange}
                        />
                    </div>
                    <Input
                        name="lugar"
                        placeholder="Lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                    />
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button
                        onClick={handleSubmit}
                        className="bg-uaa-blue text-white hover:bg-uaa-blue/90"
                        disabled={!isValid}
                    >
                        {isEditando ? "Guardar Cambios" : "Crear Actividad"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

