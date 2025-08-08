import * as LucideIcons from "lucide-react"
import { User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface ScheduleItem {
    id: string
    title: string
    dateISO: string
    startISO?: string
    endISO?: string
    location?: string
    icon?: string
    kind: "academica" | "recreativa" | "conferencia"
}

interface CalendarViewProps {
    items: ScheduleItem[]
}

export default function CalendarView({ items }: CalendarViewProps) {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    const hours = Array.from({ length: 14 }, (_, i) => i + 7)

    const getIconComponent = (iconName?: string) => {
        if (!iconName) return User
        const Icon = (LucideIcons as any)[iconName]
        return Icon || User
    }

    const toLocal = (iso?: string) => (iso ? new Date(iso) : undefined)

    const getDayIndexMonFirst = (d: Date) => {
        const js = d.getDay()
        return (js + 6) % 7
    }

    const getHour = (d?: Date) => (d ? d.getHours() : undefined)

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#002E5D] dark:text-gray-100 mb-2">Mi Horario</h2>
                <p className="text-gray-600 dark:text-gray-400">Visualiza todas tus actividades y conferencias</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Grid de calendario */}
                <div className="lg:col-span-3">
                    <Card className="bg-white/80 dark:bg-[#1F1F1F] backdrop-blur-xl border-white/20 dark:border-gray-800 shadow-2xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-8 gap-2">
                                <div></div>
                                {days.map((day) => (
                                    <div key={day} className="text-center font-semibold text-[#002E5D] dark:text-gray-100 p-2">
                                        {day}
                                    </div>
                                ))}

                                {hours.map((hour) => (
                                    <div key={hour} className="contents">
                                        <div className="text-right text-sm text-gray-500 dark:text-gray-400 p-2">{hour}:00</div>

                                        {days.map((dayLabel, dayColIdx) => (
                                            <div
                                                key={`${dayLabel}-${hour}`}
                                                className="border border-gray-200 dark:border-gray-800 p-2 min-h-[60px] rounded-xl"
                                            >
                                                {items
                                                    .filter((ev) => {
                                                        const start = toLocal(ev.startISO ?? ev.dateISO)
                                                        if (!start) return false
                                                        const dayIdx = getDayIndexMonFirst(start)
                                                        const hh = getHour(start)
                                                        return dayIdx === dayColIdx && hh === hour
                                                    })
                                                    .map((ev) => {
                                                        const Icon = getIconComponent(ev.icon)
                                                        const badge =
                                                            ev.kind === "academica"
                                                                ? "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                                                                : ev.kind === "recreativa"
                                                                    ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                                                                    : "bg-green-500/15 text-green-700 dark:text-green-300"
                                                        return (
                                                            <div
                                                                key={ev.id}
                                                                className="bg-gradient-to-r from-[#002E5D] to-blue-700 text-white p-2 rounded-xl text-xs shadow-lg space-y-1"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`px-2 py-0.5 rounded ${badge}`}> {ev.kind} </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                                                                        <Icon className="w-4 h-4 text-white" />
                                                                    </div>
                                                                    <div className="font-semibold truncate">{ev.title}</div>
                                                                </div>
                                                                {ev.location && <div className="opacity-90 truncate">{ev.location}</div>}
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista lateral */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-[#002E5D] dark:text-gray-100">Mis eventos</h3>
                    {items.map((ev) => {
                        const Icon = getIconComponent(ev.icon)
                        const date = toLocal(ev.dateISO)
                        const time = toLocal(ev.startISO)
                        const dateStr = date ? date.toLocaleDateString() : "—"
                        const timeStr = time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"
                        return (
                            <Card key={ev.id} className="bg-white/80 dark:bg-[#1F1F1F] backdrop-blur-xl border-white/20 dark:border-gray-800 shadow-lg">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-[#002E5D] dark:text-gray-100 text-sm">{ev.title}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {dateStr} • {timeStr} {ev.location ? `• ${ev.location}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

