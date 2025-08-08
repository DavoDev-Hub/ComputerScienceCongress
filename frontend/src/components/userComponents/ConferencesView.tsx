"use client"

import { Calendar, Clock, MapPin, Mic } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ConferenceUI } from "@/types/userTypes/conference"

interface ConferencesViewProps {
    conferences: ConferenceUI[]
    title?: string
    subtitle?: string
}

export default function ConferencesView({
    conferences,
    title = "Conferencias y Congresos",
    subtitle = "Inscripción automática al iniciar sesión",
}: ConferencesViewProps) {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#002E5D] dark:text-gray-100 mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
            </div>

            {conferences.length === 0 ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No hay conferencias disponibles por ahora.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conferences.map((c) => (
                        <Card
                            key={c.id}
                            className="bg-white/80 dark:bg-[#1F1F1F] backdrop-blur-xl border-white/20 dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-[#002E5D] dark:text-gray-100 text-lg leading-tight">
                                            {c.title}
                                        </CardTitle>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Mic className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                            <span>{c.speaker}</span>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/30"
                                    >
                                        ✓ Inscrito
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm">
                                <p className="text-gray-700 dark:text-gray-300">{c.description}</p>

                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Calendar className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                    <span>{c.date} • {c.time}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Clock className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                    <span>{c.duration}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <MapPin className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                    <span>{c.location}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

