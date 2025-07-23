import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { crearConferencia, editarConferencia } from "@/services/adminServices/apiConference"
import { toast } from "sonner"


interface ModalCrearConferenciaProps {
    onSuccess: () => void
    initialData?: any
}


export function ModalCrearConferencia({
    onSuccess,
    initialData
}: ModalCrearConferenciaProps) {
    const isEditando = Boolean(initialData)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        ponente: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        lugar: ""
    })

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

    const handleSubmit = async () => {
        if (!isValid) return

        const conferencia = {
            ...formData,
            horaInicio: `${formData.fecha}T${formData.horaInicio}`,
            horaFin: `${formData.fecha}T${formData.horaFin}`
        }

        try {
            if (isEditando) {
                await editarConferencia(initialData.id, conferencia)
                toast("Conferencia actualizada", {
                    description: `La actividad "${formData.nombre}" fue modificada correctamente.`,
                    duration: 5000
                })
            } else {
                await crearConferencia(conferencia)
                toast("Conferencia creada", {
                    description: `La conferencia "${formData.nombre}" fue registrada exitosamente.`,
                    duration: 5000
                })
            }

            onSuccess()
            setFormData({
                nombre: "",
                ponente: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                lugar: ""
            })
            setOpen(false)
        } catch (error) {
            console.error("Error al guardar conferencia:", error)
            toast("Error", {
                description: "Ocurrió un problema al guardar la conferencia.",
                duration: 5000
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isEditando && (
                <DialogTrigger asChild>
                    <Button className="bg-uaa-blue text-white hover:bg-uaa-blue/90">
                        Agregar Conferencia
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditando ? "Editar Conferencia" : "Crear Nueva Actividad"}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {isEditando
                            ? "Modifica los campos necesarios para actualizar la conferencia"
                            : "Completa la información para crear una nueva conferencia"}
                    </p>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            name="nombre"
                            placeholder="Nombre de la conferencia"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <Textarea
                        name="descripcion"
                        placeholder="Descripción de la conferencia"
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
                        name="ponente"
                        placeholder="Ponente"
                        value={formData.ponente}
                        onChange={handleChange}
                    />
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
                        {isEditando ? "Guardar Cambios" : "Crear Conferencia"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

