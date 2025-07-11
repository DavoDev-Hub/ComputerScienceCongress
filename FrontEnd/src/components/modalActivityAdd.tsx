import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { crearActividad } from "../services/api"
import { toast } from "sonner"


interface ModalCrearActividadProps {
    onSuccess: () => void
}

export function ModalCrearActividad({ onSuccess }: ModalCrearActividadProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        cupo: "",
        ponente: "",
        lugar: "",
    })

    const isValid = Object.values(formData).every((val) => val.trim() !== "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, tipo: value }))
    }

    const handleSubmit = async () => {
        if (!isValid) return

        const nuevaActividad = {
            ...formData,
            cupo: parseInt(formData.cupo),
            horaInicio: `${formData.fecha}T${formData.horaInicio}`,
            horaFin: `${formData.fecha}T${formData.horaFin}`
        }

        try {
            await crearActividad(nuevaActividad)
            onSuccess()

            toast("Actividad creada", {
                description: `La actividad "${formData.nombre}" fue registrada exitosamente.`,
                duration: 5000,
                action: {
                    label: "undo",
                    onClick: () => {
                        console.log("undo")
                    }
                }
            })

            setFormData({
                nombre: "",
                tipo: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                cupo: "",
                ponente: "",
                lugar: ""
            })
            setOpen(false)
        } catch (error) {
            console.error("Error al crear actividad:", error)

            toast("Error al crear actividad", {
                description: "Ocurrió un problema al registrar la actividad.",
                duration: 5000
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-uaa-blue text-white hover:bg-uaa-blue/90">Agregar Actividad</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Actividad</DialogTitle>
                    <p className="text-sm text-muted-foreground">Completa la información para crear una nueva actividad</p>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="nombre" placeholder="Nombre de la actividad" value={formData.nombre} onChange={handleChange} />
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

                    <Textarea name="descripcion" placeholder="Descripción de la actividad" value={formData.descripcion} onChange={handleChange} />

                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                        <Input name="cupo" type="number" placeholder="Cupo" value={formData.cupo} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input name="horaInicio" type="time" placeholder="Hora inicio (ej. 14:00)" value={formData.horaInicio} onChange={handleChange} />
                        <Input name="horaFin" type="time" placeholder="Hora fin (ej. 16:30)" value={formData.horaFin} onChange={handleChange} />
                    </div>

                    <Input name="ponente" placeholder="Ponente" value={formData.ponente} onChange={handleChange} />
                    <Input name="lugar" placeholder="Lugar" value={formData.lugar} onChange={handleChange} />
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
                        Crear Actividad
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

