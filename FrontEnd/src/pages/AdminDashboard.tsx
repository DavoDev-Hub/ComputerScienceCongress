import { useEffect, useState } from "react"
import { getActividades } from "../services/api"
import type { Actividad } from "../types/activity"
import { ActivityCard } from "../components/ActivityCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"

export default function AdminDashboard() {
  const [actividades, setActividades] = useState<Actividad[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getActividades().then(setActividades)
  }, [])

  const filteredActividades = (tipo: "all" | "academico" | "recreativo") => {
    return actividades.filter((actividad) => {
      const coincideTipo = tipo === "all" || actividad.tipo === tipo
      const coincideBusqueda = actividad.nombre.toLowerCase().includes(search.toLowerCase())
      return coincideTipo && coincideBusqueda
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Panel de Administración</h2>
          <p className="text-gray-600">Gestiona todas las actividades del congreso</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar actividades..."
            className="pl-10 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="academico">Académicas</TabsTrigger>
          <TabsTrigger value="recreativo">Recreativas</TabsTrigger>
        </TabsList>

        {["all", "academico", "recreativo"].map((tipo) => (
          <TabsContent key={tipo} value={tipo}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActividades(tipo as "all" | "academico" | "recreativo").map((actividad) => (
                <ActivityCard
                  key={actividad.id}
                  nombre={actividad.nombre}
                  descripcion={actividad.descripcion}
                  fecha={actividad.fecha}
                  lugar={actividad.lugar}
                  horaInicio={actividad.horaInicio}
                  horaFin={actividad.horaFin}
                  cupo={actividad.cupo}
                  tipo={actividad.tipo}
                  onEdit={() => console.log("Editar", actividad.id)}
                  onDelete={() => console.log("Eliminar", actividad.id)}
                  onView={() => console.log("Ver asistentes", actividad.id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

